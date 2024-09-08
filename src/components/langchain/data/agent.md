## Agents
- Agent 操作過程為何？


- common way to create a conversational agent
    ```python
    from langchain.agents import initialize_agent, load_tools, AgentType
    from langchain.llms import OpenAI

    llm = OpenAI(openai_api_key=userdata.get('openaikey'))
    tools = load_tools(["wikipedia", "llm-math"], llm=llm)
    agent = initialize_agent(tools , llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)
    result_1=agent.run("I have 500 rupees and want to buy a toy priced at 355 rupees. Please let me know how much money I will have left after purchasing the toy. ")
    print(result_1)
    ```


- Agent 怎麼選擇工具（vectordatabase）？— 每個 retriever chain 都測嗎？
- Agent 傳入到 Tool Funciton 的參數為？


- `initialize_agent()` [doc](https://api.python.langchain.com/en/latest/agents/langchain.agents.initialize.initialize_agent.html)
    ```python
    Params:
        tools (List[BaseTool])
        llm (Base[BaseLanguageModel])
        agent (Optional[AgentType])

    Returns:
        AgentExecutor 
    ```

- `AgentExecutor.__call()` [doc](https://api.python.langchain.com/en/latest/_modules/langchain/agents/agent.html#AgentExecutor)
    ```python
    """ Run text through and get agent response """

    Params: 
        inputs (Dict[str, str])
        run_manager: (Optional[CallbackManagerForChainRun]) = None

    Return:
        outpus specified in Chain.output_keys (Dict[str, Any])
    ```

- `_iter_next_step()`
    ```
    Params:
        name_to_tool_map: (Dict[str, BaseTool])
        color_mapping: (Dict[str, str])
        inputs: (Dict[str, str])
        intermediate_steps: (List[Tuple[AgentAction, str]])
        run_manager: (Optional[CallbackManagerForChainRun]) = None
    
    Return:    
        Iterator[Union[AgentFinish, AgentAction, AgentStep]]:
    ```
    ```python
        """Take a single step in the thought-action-observation loop.

        Ask LLM about what tool to choose
        """
        try:
            intermediate_steps = self._prepare_intermediate_steps(intermediate_steps)

            # Call the LLM to see what to do.
            output = self.agent.plan(
                intermediate_steps,
                callbacks=run_manager.get_child() if run_manager else None,
                **inputs,
            )
        except OutputParserException as e:
            ...
        

        # If the tool chosen is the finishing tool, then we end and return.
        if isinstance(output, AgentFinish):
            yield output
            return

        actions: List[AgentAction]
        if isinstance(output, AgentAction):
            actions = [output]
        else:
            actions = output
        for agent_action in actions:
            yield agent_action
        for agent_action in actions:
            yield self._perform_agent_action(
                name_to_tool_map, color_mapping, agent_action, run_manager
            )
    ```
- `Agent.plan()` [doc](https://api.python.langchain.com/en/latest/_modules/langchain/agents/agent.html#AgentExecutor)
    ```
    Params:
        intermediate_steps: (List[Tuple[AgentActions, str]]) steps the LLM has taken to date along with observations

        callbacks: (Callbacks=None)
        **kwargs: Any
    Return:
        action specifying what tool to use: ([AgentAction, AgentFinish])

    ```
    ```python
    full_inputs = self.get_full_inputs(intermediate_steps, **kwargs)
    full_output = self.llm_chain.predict(callbacks=callbacks, **full_inputs)
    return self.output_parser.parse(full_output)
    ```

結論: agent tool routing 是經由 llm 篩選的
intermediate steps 為 list of  `_take_next_step()` 之 return type: Union[AgentFinish, List[Tuple[AgentAction, str]]]


### RetrievalQA chain
- 是否有針對 chain 的結果進行潤稿相關的動作？— 若單純回傳 Topk 是可行的嗎？（不使用 RetrieveQA Chain）

```python
azure_llm = AzureOpenAI(
    deployment_name="GPT3"
)
    
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


embedding_fn = Embedding(device="cuda:1").load_embeddings()
db_object = Database(data_path="./data/db", collection_name=COLLECTION_NAME, embedding_function=embedding_fn)
qa_db = db_object.get_db()

qa_prompt_template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

{content}

Question: {question}
Helpful Answer:"""
qa_prompt = PromptTemplate(
    template=qa_prompt_template, input_variables=["content", "question"]
)
qa_llm_chain = LLMChain(llm=azure_llm, prompt=qa_prompt)
qa_retriever = qa_db.as_retriever(search_kwargs={"k": 4})
rag_chain = (
    {"content": qa_retriever | format_docs,
     "question": RunnablePassthrough()
    }
    | qa_prompt
    | azure_llm
)
rag_chain.invoke("What is the meaning of the acronym 'TAILS' used in protein N-terminomics?")
```


agent2 = "- How does agent select tools（vectorbase）? Does it check every retriever chain ？\n- What are the parameters passed in to Tool function?\n- `initialize_agent()` [doc](https://api.python.langchain.com/en/latest/agents/langchain.agents.initialize.initialize_agent.html)\n\t```python\n\tParams:\n\ttools (List[BaseTool])\n\tllm (Base[BaseLanguageModel])\n\tagent (Optional[AgentType])\n\n\tReturns:\n\t\tAgentExecutor \n\t```\n\t- `AgentExecutor.__call()` [doc](https://api.python.langchain.com/en/latest/_modules/langchain/agents/agent.html#AgentExecutor)\n\t```python\n\t""" Run text through and get agent response """
\n\n\tParams: \n\tinputs (Dict[str, str])\n\trun_manager: (Optional[CallbackManagerForChainRun]) = None\n\tReturn:
\n\toutpus specified in Chain.output_keys (Dict[str, Any])\n\t```\n- `_iter_next_step()`\n\t```\n\tParams:\n\t\tname_to_tool_map: (Dict[str, BaseTool])\n\t\tcolor_mapping: (Dict[str, str])\n\t\tinputs: (Dict[str, str])\n\t\tintermediate_steps: (List[Tuple[AgentAction, str]])\n\t\trun_manager: (Optional[CallbackManagerForChainRun]) = None\n\tReturn:    \n\t\tIterator[Union[AgentFinish, AgentAction, AgentStep]]:
\n\t```\n\t```python\n\t\t"""Take a single step in the thought-action-observation loop.\n\t\tAsk LLM about what tool to choose\n\t\t """\n\t\ttry:\n\t\tintermediate_steps = self._prepare_intermediate_steps(intermediate_steps)\n\t\t# Call the LLM to see what to do.\n\t\toutput = self.agent.plan(\n\t\t\tintermediate_steps,\n\t\t\tcallbacks=run_manager.get_child() if run_manager else None,\n\t\t\t**inputs,\n\t\t)\n\t\texcept OutputParserException as e:\n\t ...\n\t# If the tool chosen is the finishing tool, then we end and return.\n\tif isinstance(output, AgentFinish):\n\t\t yield output\n\t\treturn\n\t\tactions: List[AgentAction]\n\tif isinstance(output, AgentAction):\n\t\tactions = [output]\n\telse:\n\t\tactions = output\n\t for agent_action in actions:\n\t\tyield agent_action\n\t\tfor agent_action in actions:\n\t\t\tyield self._perform_agent_action(name_to_tool_map, color_mapping, agent_action, run_manager)\n\t```\n- `Agent.plan()` [doc](https://api.python.langchain.com/en/latest/_modules/langchain/agents/agent.html#AgentExecutor)\n\t```\n\tParams:\n\t\tintermediate_steps: (List[Tuple[AgentActions, str]]) steps the LLM has taken to date along with observations\n\n\t\tcallbacks: (Callbacks=None)\n\t\t**kwargs: Any\n\tReturn:\n\t\taction specifying what tool to use: ([AgentAction, AgentFinish])\n\t```\n\t```python\n\tfull_inputs = self.get_full_inputs(intermediate_steps, **kwargs)\n\tfull_output = self.llm_chain.predict(callbacks=callbacks, **full_inputs)\n\treturn self.output_parser.parse(full_output)\n\t ```\n\n\t- 結論: agent tool routing 是經由 llm 篩選的\nintermediate steps 為 list of  `_take_next_step()` 之 return type: Union[AgentFinish, List[Tuple[AgentAction, str]]]"


agent3 = "### RetrievalQA chain\n- 是否有針對 chain 的結果進行潤稿相關的動作？— 若單純回傳 Topk 是可行的嗎？（不使用 RetrieveQA Chain）\nazure_llm = AzureOpenAI(deployment_name="GPT3")\n\ndef format_docs(docs):\n\treturn "\n\n".join(doc.page_content for doc in docs)\n\nembedding_fn = Embedding(device="cuda:1").load_embeddings()\ndb_object = Database(data_path="./data/db", collection_name=COLLECTION_NAME,\nembedding_function=embedding_fn)\nqa_db = db_object.get_db()
\n\nqa_prompt_template = """Use the following pieces of context to answer the question at the end.\nIf you don't know the answer, just say that you don't know, don't try to make up an answer.\n{content}\n\nQuestion: {question}\nHelpful Answer:"""\nqa_prompt = PromptTemplate(\n\ttemplate=qa_prompt_template, input_variables=["content", "question"])\nqa_llm_chain = LLMChain(llm=azure_llm, prompt=qa_prompt)\nqa_retriever = qa_db.as_retriever(search_kwargs={"k": 4})\nrag_chain = (\n{"content": qa_retriever | format_docs,\n\t"question": RunnablePassthrough()\n\t}\n\t| qa_prompt\n\t| azure_llm)\nrag_chain.invoke("What is the meaning of the acronym 'TAILS' used in protein N-terminomics?")"