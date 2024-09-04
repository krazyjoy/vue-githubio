### Goal —  Use Langchain Tool or Self Build Tool  
- Test Langchain Tool （Request Tool） — [doc](https://python.langchain.com/v0.1/docs/integrations/tools/requests/), [source code](https://github.com/langchain-ai/langchain/blob/master/libs/community/langchain_community/tools/requests/tool.py)
    - How to use Langchain's built in Request Tool？— Is URL predefined or designated by LLM?
- Customizing Default Tools （[doc](https://python.langchain.com/v0.1/docs/modules/tools/#customizing-default-tools)）& Defining Custom Tools （[doc](https://python.langchain.com/v0.1/docs/modules/tools/custom_tools/)）
- Build Function and define it as tool with @tool decorator
    - How to pass in arguments？What are the formats of arguments？
- Inherit BaseTool class to contruct tools（More professional？XD）— [doc](https://python.langchain.com/v0.1/docs/modules/tools/custom_tools/)
    - How to instantiate？ What are some required abstract methods？
- Advanced Practice — research other langchain tool source code （shell, vectorstore ） — [GitHub](https://github.com/langchain-ai/langchain/tree/master/libs/community/langchain_community/tools)





- Customizing Default Tools （[doc](https://python.langchain.com/v0.1/docs/modules/tools/) )
- 建立 Function 並透過 @tool 裝飾器將它定義為工具。
    ```
    def <function-name>(argument: <arg-type>)-><return type>:

    ```
- BaseTool Class 建立工具
    ```python
    def <function-name>(BaseTool):
        name: <string>
        description: <string>
        args_schema: Type[BaseModel] = <Model-name>

        sync_function()
        async_function()
    ```

    
### Customize Default Tools

- （Joy）example code — 如果想把多個 endpoint 放同 class 可以嗎？適當嗎（會有問題嗎）？
    - 建立多個Tools，每個放不同endpoint比較好，._run() 只打一個 endpoint 感覺比較不容易出問題??

```python
# joy exmaple code
from langchain.tools import BaseTool
from pydantic import BaseModel, Field
import requests

class APIQueryToolConfig(BaseModel):
    api_url: str = Field()
    api_path: str = Field()

class APIQueryTool(BaseTool):
    name = "API Query"
    description = "Tool for querying a API server"
    config: Optional[APIQueryToolConfig] = None

    def __init__(self, api_url: str, api_path: str):
        super().__init__()
        self.config = APIQueryToolConfig(api_url=api_url, api_path=api_path)

    def _run(self, query: str):
        params = {'query': query}
        response = requests.get(f"{self.config.api_url}{self.config.api_path}", params=params)
        if response.status_code == 200:
            return response.json()
        else:
            return f"Error: {response.text}"

    def _arun(self, query: str):
        raise NotImplementedError("This tool does not support async")

api_query_tool = APIQueryTool(api_url=RAG_API_URL, api_path="/rag/files")
tools = [api_query_tool
```


## Deeper Dive - How to implement query-routing?
- `RetrievalQA.from_chain_type()` [doc](https://api.python.langchain.com/en/latest/_modules/langchain/chains/retrieval_qa/base.html#RetrievalQA)
    ```python
        def from_chain_type(cls, llm: BaseLanguageModel, chain_type: str = "stuff", chain_type_kwargs: Optional[dict] = None, **kwargs: Any) -> BaseRetrievalQA:
            """Load chain from chain type."""
            _chain_type_kwargs = chain_type_kwargs or {}
            combine_documents_chain = load_qa_chain(
                llm, chain_type=chain_type, **_chain_type_kwargs
            )
        return cls(combine_documents_chain=combine_documents_chain, **kwargs)
        
        
        def load_qa_chain(llm: BaseLanguageModel, chain_type: str = "stuff", verbose: Optional[bool] = None, callback_manager: Optional[BaseCallbackManager] = None, **kwargs: Any,) -> BaseCombineDocumentsChain:
            """Load question answering chain.

            Args:
                llm: Language Model to use in the chain.
                chain_type: Type of document combining chain to use. Should be one of "stuff",
                    "map_reduce", "map_rerank", and "refine".
                verbose: Whether chains should be run in verbose mode or not. Note that this
                    applies to all chains that make up the final chain.
                callback_manager: Callback manager to use for the chain.

            Returns:
                A chain to use for question answering.
            """
            loader_mapping: Mapping[str, LoadingCallable] = {
                "stuff": _load_stuff_chain,
                "map_reduce": _load_map_reduce_chain,
                "refine": _load_refine_chain,
                "map_rerank": _load_map_rerank_chain,
            }
            if chain_type not in loader_mapping:
                raise ValueError(
                    f"Got unsupported chain type: {chain_type}. "
                    f"Should be one of {loader_mapping.keys()}"
                )
            return loader_mapping[chain_type](
                llm, verbose=verbose, callback_manager=callback_manager, **kwargs
            )

        def _load_stuff_chain(
            llm: BaseLanguageModel,
            prompt: Optional[BasePromptTemplate] = None,
            document_variable_name: str = "context",
            verbose: Optional[bool] = None,
            callback_manager: Optional[BaseCallbackManager] = None,
            callbacks: Callbacks = None,
            **kwargs: Any,
        ) -> StuffDocumentsChain:
            _prompt = prompt or stuff_prompt.PROMPT_SELECTOR.get_prompt(llm)
            llm_chain = LLMChain(
                llm=llm,
                prompt=_prompt,
                verbose=verbose,  # type: ignore[arg-type]
                callback_manager=callback_manager,
                callbacks=callbacks,
            )
            # TODO: document prompt
            return StuffDocumentsChain(
                llm_chain=llm_chain,
                document_variable_name=document_variable_name,
                verbose=verbose,  # type: ignore[arg-type]
                callback_manager=callback_manager,
                callbacks=callbacks,
                **kwargs,
            )

        class StuffDocumentsChain(BaseCombineDocumentsChain):
        """Chain that combines documents by stuffing into context.

        This chain takes a list of documents and first combines them into a single string.
        It does this by formatting each document into a string with the `document_prompt`
        and then joining them together with `document_separator`. It then adds that new
        string to the inputs with the variable name set by `document_variable_name`.
        Those inputs are then passed to the `llm_chain`.

    ```

- `RetrievalQA.from_chain_type()` [doc](https://api.python.langchain.com/en/latest/_modules/langchain/chains/retrieval_qa/base.html#RetrievalQA)
    - `from_chain_type()` -> `load_qa_chain()` -> `_load_stuff_chain()`
    - `_load_stuff_chain()`: LLMChain -> StuffDocumentChain
    - `StuffDocumentChain`: LLMChain + Prompt


### 以 RedditTool 為例 — Agent 是否可以從問題中解析出 keyword & subreddit ?
- 使用 `AgentExecutor.from_agent_and_tools()` [code](D:\ITRI\bitbucket\rags\AgentTools\availableTools\redditAPI\smartReddit.py)

- 結果: D:\ITRI\bitbucket\rags\AgentTools\availableTools\redditAPI\results.md



###### node

tools1 = "## Goal —  Use Langchain Tool or Self Build Tool\n- Test Langchain Tool （Request Tool） — [doc](https://python.langchain.com/v0.1/docs/integrations/tools/requests/), [source code](https://github.com/langchain-ai/langchain/blob/master/libs/community/langchain_community/tools/requests/tool.py)\n\t- How to use Langchain's built in Request Tool？— Is URL predefined or designated by LLM?\n- Customizing Default Tools （[doc](https://python.langchain.com/v0.1/docs/modules/tools/#customizing-default-tools)）& Defining Custom Tools （[doc](https://python.langchain.com/v0.1/docs/modules/tools/custom_tools/)）\n- Build Function and define it as tool with @tool decorator\n\t- How to pass in arguments？What are the formats of arguments？\n- Inherit BaseTool class to contruct tools（More professional？XD）— [doc](https://python.langchain.com/v0.1/docs/modules/tools/custom_tools/)\n\t- How to instantiate？ What are some required abstract methods？\n- Advanced Practice — research other langchain tool source code （shell, vectorstore ） — [GitHub](https://github.com/langchain-ai/langchain/tree/master/libs/community/langchain_community/tools)"


tools2 = "- Customizing Default Tools （[doc](https://python.langchain.com/v0.1/docs/modules/tools/))\n-Build Function and define it as tool with @tool decorator。\n\t```\n\tdef <function-name>(argument: <arg-type>)-><return type>:\n\t ```\n- BaseTool Class 建立工具\n\t```python\n\tdef <function-name>(BaseTool):\n\t\tname: <string>\n\t\tdescription: <string>\n\t\targs_schema: Type[BaseModel] = <Model-name>\n\n\t\tsync_function()\n\t\tasync_function()\n\t```"


tools3 = "## Deeper Dive - How to implement query-routing?\n- `RetrievalQA.from_chain_type()` [doc](https://api.python.langchain.com/en/latest/_modules/langchain/chains/retrieval_qa/base.html#RetrievalQA)\n\t- `from_chain_type()` -> `load_qa_chain()` -> `_load_stuff_chain()`\n\t- `_load_stuff_chain()`: LLMChain -> StuffDocumentChain\n\t- `StuffDocumentChain`: LLMChain + Prompt"


tools4 = "- （Joy）example code — Q. If placing multiple endpoints in 1 tool, will that be feasible？\n\t- A. It's better to build multiple tools, each with individual endpoint to function,.run() only has query as input, which may raise the difficulty of differentiating different endpoints with merely queries.\n\n```python\nfrom langchain.tools import BaseTool\nfrom pydantic import BaseModel, Field\nimport requests\nclass APIQueryToolConfig(BaseModel):\n\tapi_url: str = Field()\n\tapi_path: str = Field()\n\nclass APIQueryTool(BaseTool):\n\tname = \"API Query\"\n\tdescription = \"Tool for querying a API server\"\n\tconfig: Optional[APIQueryToolConfig] = None\n\tdef __init__(self, api_url: str, api_path: str):\n\t\tsuper().__init__()\n\t\tself.config = APIQueryToolConfig(api_url=api_url, api_path=api_path)\n\n\tdef _run(self, query: str):\n\t\tparams = {'query': query}\n\t\tresponse = requests.get(f"{self.config.api_url}{self.config.api_path}", params=params)\n\t\tif response.status_code == 200:\n\t\t\treturn response.json()\n\t\telse:\n\t\t\treturn f\"Error: {response.text}\"\n\n\tdef _arun(self, query: str):\n\t\traise NotImplementedError("This tool does not support async")\n\napi_query_tool = APIQueryTool(api_url=RAG_API_URL, api_path="/rag/files")\ntools = [api_query_tool]```"

"