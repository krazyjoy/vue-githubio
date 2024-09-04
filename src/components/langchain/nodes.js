const Embedding1 = '## Embedding \n- 理解 word2vec 與 Embedding的概念 —「每個東西都能用向量代表；若兩個東西相似則兩個向量座標距離相近。」\n\t - 參考文章 — [讓電腦聽懂人話: 直觀理解 Word2Vec 模型](https://tengyuanchang.medium.com/%E8%AE%93%E9%9B%BB%E8%85%A6%E8%81%BD%E6%87%82%E4%BA%BA%E8%A9%B1-%E7%90%86%E8%A7%A3-nlp-%E9%87%8D%E8%A6%81%E6%8A%80%E8%A1%93-word2vec-%E7%9A%84-skip-gram-%E6%A8%A1%E5%9E%8B-73d0239ad698)\n\t - 何謂結構化與非結構化資料？ \n\t -「Embedding是指高維離散的特徵映射到相對低維的連續向量空間中的表示方式。」\n\t - Embeddings 通常是透過處理目標（下游）任務時所學習到的。\n\t\t用 Auto-Encoder 說明 Embeddings'
const Embedding2 = '理解 llamaIndex Fine-tune Embedding (for RAG) 流程— \n（[doc](https://docs.llamaindex.ai/en/stable/examples/finetuning/embeddings/finetune_embedding/), \n[source code](https://github.com/run-llama/llama_index/blob/main/llama-index-finetuning/llama_index/finetuning/embeddings/sentence_transformer.py)）\n\t - Training data 如何產生的？產生的格式為何？ \n\t\t - 利用 SimpleDirectoryReader 物件的load_data() 讀進 pdf \n\t\t - 利用 SentenceSplitter 將 document 切割成 nodes (或熟知的chunks) \n\t - 這裡 LLM 的作用為何？ \n\t\t - 使用到的 Prompt 是？(llama_index/llama-index-finetuning/llama_index/finetuning/embeddings/common.py at main · run-llama/llama_index (github.com))'
const Embedding3 = '訓練後如何驗證模型結果? \n\t1.Hit Rate: 若 retrieve embed model取得的 response top k 中含有 relevant docs 中的一個，則算一個hit \n\t2.InformationRetrievalEvaluator: 計算 topk 中的 accuract, precision, recall, MRR, NDCG MAP'



const Encoder1 = "## Cross Encoder v.s. Bi Encoder \n\t- [Cross-Encoders](https://www.sbert.net/examples/applications/cross-encoder/README.html?ref=jina-ai-gmbh.ghost.io)\n\t- Difference:\n\t\t- Cross Encoders must process two sentences in 1 model at the same time\n\t\t- Cross Encoders produces a 0~1 value as output from the classification layer\n\t\t- Bi Encoders process each sentence individually then outputs a sentence embedding\n\t\t- Bi Encoders use cosine similarity to compare relavance between two sentences\n\t- Scene:\n\t\t- When there are pairs of sentences prepared to calculate their similarities $\\rightarrow$  Cross Encoders\n\t\t- When dealing with clustering or needs sentence embeddings to do other downstream tasks $\\rightarrow$ Bi Encoders\n\t- Why are Cross Encoders a suitable model for reranking ?\n\t\t - definition of Rerank Model: \n\t\t- Cross encoders can be a choice of reranker model because it generates outputs of 0~1 values instead of sentence embedings. A useful scene for RAG will be compare the pairs of (query1, context1) and (query1, context2) to find the higher similarity match. This similarity score helps to determine the ranking order of documents with respond to query1."

const finetuneEmbedding1 = "- How does the training data generate? \n\t- SimpleDirectoryReader object managaes the load_data() function to read in PDF files\n\t- What is the format of the training dataset\n\t- SentenceSplitter object splits documents into nodes (a.k.a chunks)"

const finetuneEmbedding2 = "- [source-code](https://github.com/run-llama/llama_index/blob/main/llama-index-finetuning/llama_index/finetuning/embeddings/common.py#L111)\n\t- How does LLM function here?\n\t- LLM generates queries based on given chunks (context)\n\t```python\n\tdef generate_qa_embeddings_pairs(nodes: List[TextNode], llm: LLM,       qa_generate_prompt_tmpl: str=DEFAULT_QA_GENERATE_PROMPT_TMPL):\n\t\tqueries, corpus, relevant_docs = load_existing_data(output_path)\n\t\t# ... (steps producing nodes)\n\t\tquery = qa_generate_prompt_tmpl.format(context_str=text, ...) # generates query(actually content for each node)\n\t\t...\n\t\twhile retry_count < retry_limit:\n\t\t\t try:\n\t\t\tresponse = llm.complete(query) # llm generates query reversely\n\t\t\t...\n\t```"
const finetuneEmbedding3 = "- [complete()](https://github.com/run-llama/llama_index/blob/main/llama-index-core/llama_index/core/base/llms/base.py)\n\t```python\n\t@abstractmethod\n\tdef complete(\n\t\tself, prompt: str, formatted: bool = False, **kwargs: Any\n\t) -> CompletionResponse:\n\t\t\"\"\"Completion endpoint for LLM."

+ "\n\t\t If the LLM is a chat model, the prompt is transformed into a single `user` message.\n\tArgs:\t\tprompt (str): Prompt to send to the LLM. \n\t\t\t\tformatted (bool, optional):\n\t\t\t\tWhether the prompt is already formatted for the LLM, by default False.\n\t\tkwargs (Any):\n\t\t\t\tAdditional keyword arguments to pass to the LLM.\n\t\t Returns:\n\t\t\tCompletionResponse: Completion response from the LLM."

+ "\n\t\tExamples:\n\t\t\t```python\n\t\t\tresponse = llm.complete(\"your prompt\")\n\t\t\tprint(response.text)\n\t\t\t ```\n\t\t\"\"\"\n\t ```"

const finetuneEmbedding4 = "qa_template:  DEFAULT_QA_GENERATE_PROMPT_TMPL"

const finetuneEmbedding5 = "- How to evaluate the Finetuned Embeddings?\n\t1. Hit Rate\n\t\t- Hit: If the source document from the top k reponses matches one of the relevant documents, it is counted as a hit.\n\t2. Information Retrieval Evaluator\n\t\t- Calculate more information"
+ "\n\t\t - such as: accuracy, precision, recall, MRR, NDCG, MAP ..."

const sentenceTransformerEngine1 = "## SentenceTransformersFinetuneEngine\n1. Prepare Chunks\n\t- PDF $\\rightarrow$ `SimpleDirectoryReader().load_data()` $\\rightarrow$ docs\n\t- docs $\\rightarrow$ `SentenceSplitter().get_nodes_from_documents()` $\\rightarrow$ nodes"
+ "\n2. Generate Queries Using Context (By LLM)\n\t-  nodes $\\rightarrow$ `generate_qa_embedding_pairs()` $\\rightarrow$ dataset\n\t```python"
+ "\n\tdataset{\n\t\t\"queries\": {\n\t\t\t<qid>: <question>\n\t\t},\n\t\t\"corpus\" : {\n\t\t\t<context_id>: <context>\n\t\t},\n\t\t\"relevant_docs\" : { \n\t\t\t<qid>: <context_id>\n\t\t}\n\t}\n\t```\n\t- save to json files"



const sentenceTransformerEngine2 = "3. SentenceTransformer Model Fits Dataset\n\t- How it loads dataset to dataloader?\n\t\t1. Go through all quires\n\t\t2. For each query, chech the corresponding relevant document ids\n\t\t3. Append text from the corpus based the context ids\n\t``` python\n\tuse_all_docs=True\n\texamples = [InputExample(query1, text1), InputExample(query1, text2), InputExample(query2, text3), InputExample(query2, text4), InputExample(query2, text5)] # each query may have multiple relevant corpuses\n\n\tuse_all_docs=False"
+ "\n\texamples = [InputExample(query1, text1)] # use first relevant doc\n\t...\n\tDataLoader(examples, batch_size)\n\t```\n\t- load from json file    \n\t```python\n\twith open(\"FinetuneEngine-Dataset.json\", \"r\") as f:\n\t\t\tdata = json.load(f)\n\t\tfor query_id in data.keys():\n\t\t\tquery = data[query_id][\"query\"]\n\t\t\ttext = data[query_id][\"texts\"][0]\n\t\t\texample = InputExample(texts=[query, text])\n\t\t\texamples.append(example)\n\t\tself.examples = examples\n\t\tself.loader: DataLoader = DataLoader(examples, batch_size=batch_size)"


const agent1 = "## Agents\n- common way to create a conversational agent\n\t```from langchain.agents import initialize_agent, load_tools, AgentType\nfrom langchain.llms import OpenAI\nllm =\nOpenAI(openai_api_key=userdata.get('openaikey'))\ntools = load_tools([\"wikipedia\", \"llm-math\"], llm=llm)\nagent = initialize_agent(tools , llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)\nresult_1=agent.run(\"I have 500 rupees and want to buy a toy priced at 355 rupees. Please let me know how much money I will have left after purchasing the toy. \")\nprint(result_1)```"

const agent2 = "- How does agent select tools（vectorbase）? Does it check every retriever chain ？\n- What are the parameters passed in to Tool function?\n- `initialize_agent()` [doc](https://api.python.langchain.com/en/latest/agents/langchain.agents.initialize.initialize_agent.html)\n\t```python\n\tParams:\n\ttools (List[BaseTool])\n\tllm (Base[BaseLanguageModel])\n\tagent (Optional[AgentType])\n\n\tReturns:\n\t\tAgentExecutor \n\t```\n\t- `AgentExecutor.__call()` [doc](https://api.python.langchain.com/en/latest/_modules/langchain/agents/agent.html#AgentExecutor)\n\t```python\n\t\"\"\"Run text through and get agent response\"\"\"\n\n\tParams: \n\tinputs (Dict[str, str])\n\trun_manager: (Optional[CallbackManagerForChainRun]) = None\n\tReturn:\n\toutpus specified in Chain.output_keys (Dict[str, Any])\n\t```\n- `_iter_next_step()`\n\t```\n\tParams:\n\t\tname_to_tool_map: (Dict[str, BaseTool])\n\t\tcolor_mapping:"
+ "(Dict[str, str])\n\t\tinputs: (Dict[str, str])\n\t\tintermediate_steps: (List[Tuple[AgentAction, str]])\n\t\trun_manager: (Optional[CallbackManagerForChainRun]) = None\n\tReturn:    \n\t\tIterator[Union[AgentFinish, AgentAction, AgentStep]]:\n\t```\n\t```python\n\t\t\"\"\"Take a single step in the thought-action-observation loop.\n\t\tAsk LLM about what tool to choose\n\t\t \"\"\"\n\t\ttry:\n\t\tintermediate_steps = self._prepare_intermediate_steps(intermediate_steps)\n\t\t# Call the LLM to see what to do.\n\t\toutput = self.agent.plan(\n\t\t\tintermediate_steps,\n\t\t\tcallbacks=run_manager.get_child() if run_manager else None,\n\t\t\t**inputs,\n\t\t)\n\t\texcept OutputParserException as e:\n\t ...\n\t# If the tool chosen is the finishing tool, then we end and return.\n\tif isinstance(output, AgentFinish):\n\t\t yield output\n\t\treturn\n\t\tactions: List[AgentAction]\n\tif isinstance(output, AgentAction):\n\t\tactions = [output]\n\telse:\n\t\tactions = output\n\t for agent_action in actions:\n\t\tyield agent_action\n\t\tfor agent_action in actions:\n\t\t\tyield self._perform_agent_action(name_to_tool_map, color_mapping, agent_action, run_manager)\n\t```\n- `Agent.plan()` [doc](https://api.python.langchain.com/en/latest/_modules/langchain/agents/agent.html#AgentExecutor)\n\t```\n\tParams:\n\t\tintermediate_steps: (List[Tuple[AgentActions, str]]) steps the LLM has taken to date along with observations\n\n\t\tcallbacks: (Callbacks=None)\n\t\t**kwargs: Any\n\tReturn:\n\t\taction specifying what tool to use: ([AgentAction, AgentFinish])\n\t```\n\t```\n\tfull_inputs = self.get_full_inputs(intermediate_steps, **kwargs)\n\tfull_output = self.llm_chain.predict(callbacks=callbacks, **full_inputs)\n\treturn self.output_parser.parse(full_output)\n\t ```\n\n\t - 結論: agent tool routing 是經由 llm 篩選的\n\tintermediate steps 為 list of  `_take_next_step()` 之 return type: Union[AgentFinish, List[Tuple[AgentAction, str]]]"

const agent3 = "### RetrievalQA chain\n- 是否有針對 chain 的結果進行潤稿相關的動作？— 若單純回傳 Topk 是可行的嗎？（不使用 RetrieveQA Chain）\nazure_llm = AzureOpenAI(deployment_name=\"GPT3\")\n\ndef format_docs(docs):\n\treturn \"\n\n\".join(doc.page_content for doc in docs)\n\nembedding_fn = Embedding(device=\"cuda:1\").load_embeddings()\ndb_object = Database(data_path=\"./data/db\", collection_name=COLLECTION_NAME,\nembedding_function=embedding_fn)\nqa_db = db_object.get_db()\n\nqa_prompt_template = \"\"\"Use the following pieces of context to answer the question at the end.\nIf you don't know the answer, just say that you don't know, don't try to make up an answer.\n{content}\n\nQuestion: {question}\nHelpful Answer:\"\"\"\nqa_prompt = PromptTemplate(\n\ttemplate=qa_prompt_template, input_variables=[\"content\", \"question\"])\nqa_llm_chain = LLMChain(llm=azure_llm, prompt=qa_prompt)\nqa_retriever = qa_db.as_retriever(search_kwargs={\"k\": 4})\nrag_chain = (\n{\"content\": qa_retriever | format_docs,\n\t\"question\": RunnablePassthrough()\n\t}\n\t| qa_prompt\n\t| azure_llm)\nrag_chain.invoke(\"What is the meaning of the acronym 'TAILS' used in protein N-terminomics?\")"


const tools1 = "## Tool —  Use Langchain Tool or Self Build Tool\n- Test Langchain Tool （Request Tool） — [doc](https://python.langchain.com/v0.1/docs/integrations/tools/requests/), [source code](https://github.com/langchain-ai/langchain/blob/master/libs/community/langchain_community/tools/requests/tool.py)\n\t- How to use Langchain's built in Request Tool？— Is URL predefined or designated by LLM?\n- Customizing Default Tools （[doc](https://python.langchain.com/v0.1/docs/modules/tools/#customizing-default-tools)）& Defining Custom Tools （[doc](https://python.langchain.com/v0.1/docs/modules/tools/custom_tools/)）\n- Build Function and define it as tool with @tool decorator\n\t- How to pass in arguments？What are the formats of arguments？\n- Inherit BaseTool class to contruct tools（More professional？XD）— [doc](https://python.langchain.com/v0.1/docs/modules/tools/custom_tools/)\n\t- How to instantiate？ What are some required abstract methods？\n- Advanced Practice — research other langchain tool source code （shell, vectorstore ） — [GitHub](https://github.com/langchain-ai/langchain/tree/master/libs/community/langchain_community/tools)"

const tools2  = "- Customizing Default Tools （[doc](https://python.langchain.com/v0.1/docs/modules/tools/))\n-Build Function and define it as tool with @tool decorator。\n\t```\n\tdef <function-name>(argument: <arg-type>)-><return type>:\n\t ```\n- BaseTool Class 建立工具\n\t```python\n\tdef <function-name>(BaseTool):\n\t\tname: <string>\n\t\tdescription: <string>\n\t\targs_schema: Type[BaseModel] = <Model-name>\n\n\t\tsync_function()\n\t\tasync_function()\n\t```"

const tools3 = "## Deeper Dive - How to implement query-routing?\n- `RetrievalQA.from_chain_type()` [doc](https://api.python.langchain.com/en/latest/_modules/langchain/chains/retrieval_qa/base.html#RetrievalQA)\n\t- `from_chain_type()` -> `load_qa_chain()` -> `_load_stuff_chain()`\n\t- `_load_stuff_chain()`: LLMChain -> StuffDocumentChain\n\t- `StuffDocumentChain`: LLMChain + Prompt"

const tools4 = "- （Joy）example code — Q. If placing multiple endpoints in 1 tool, will that be feasible？\n\t- A. It's better to build multiple tools, each with individual endpoint to function,.run() only has query as input, which may raise the difficulty of differentiating different endpoints with merely queries.\n\n```python\nfrom langchain.tools import BaseTool\nfrom pydantic import BaseModel, Field\nimport requests\nclass APIQueryToolConfig(BaseModel):\n\tapi_url: str = Field()\n\tapi_path: str = Field()\n\nclass APIQueryTool(BaseTool):\n\tname = \"API Query\"\n\tdescription = \"Tool for querying a API server\"\n\tconfig: Optional[APIQueryToolConfig] = None\n\tdef __init__(self, api_url: str, api_path: str):\n\t\tsuper().__init__()\n\t\tself.config = APIQueryToolConfig(api_url=api_url, api_path=api_path)\n\n\tdef _run(self, query: str):\n\t\tparams = {'query': query}\n\t\tresponse = requests.get(f\"{self.config.api_url}{self.config.api_path}\", params=params)\n\t\tif response.status_code == 200:\n\t\t\treturn response.json()\n\t\telse:\n\t\t\treturn f\"Error: {response.text}\"\n\n\tdef _arun(self, query: str):\n\t\traise NotImplementedError(\"This tool does not support async\")\n\napi_query_tool = APIQueryTool(api_url=RAG_API_URL, api_path=\"/rag/files\")\ntools = [api_query_tool]```"


const filter1 = "## Filter - Goal - How to Filter Metadata ? \nStudy how Langchain construct filters\n- How to define filter's `metadata field` and `construct_comparison` ？ — [doc](https://python.langchain.com/v0.2/docs/how_to/query_constructing_filters/)\n- What are the functions of Comparator ([code](https://api.python.langchain.com/en/latest/structured_query/langchain_core.structured_query.Comparator.html)), Comparison ([code](https://api.python.langchain.com/en/latest/structured_query/langchain_core.structured_query.Comparison.html)) and Operation ([code]()) ？\n-  Integrate Translator to obtain filter's usage and test its feasibility \n\t- example: for every pdf with common source_id or file_name, can we filter out all the chunks from this pdf\n- Advanced - can comparators adjust dynamically"

const filter2 = "### Definitions\nlibrary: `langchain_core.structured_query`\n- Comparator \n\t- A Enumerator (枚舉物件) includes `EQ`, `NE`, `GT`, `GTE`, `LT`, `LTE`, `CONTAIN`, `LIKE`, `IN`, `NIN` comparison operators\n- Comparison\n\t- comparison to a value\n\t```python\n\tComparison(comparator=Comparator.GT, attribute=\"start_year\", value=query.start_year,)\n\t```\n- Operation\n\t- Llogical operation over other directives. 對 comparisons 進行邏輯運算\n\t```\n\tfilter = Operation(operator=Operator.AND, arguments=comparisons)\n\t```"

const filter3 = "```class ChromaDB:\n\tdef __init__(self, collection_name: str, persist_path: str):\n\t\t\"\"\"\n\t\tInitiate ChromaDB instance\n\t\tArgs:\n\t\t\tcollection_name (str): name of collection\n\t\t\tpersist_path (str): path to install chromadb \n\t\t\"\"\"\n\t\tself.chroma_client=chromadb.PersistentClient(path=persist_path)\n\t\tself.collection = self.chroma_client.get_or_create_collection(name=collection_name)\n\n\tdef get_collection(self):\n\t\t\"\"\"\n\t\tRetrieve collection\n\t\t\"\"\"\n\t\treturn self.collection\n\t@staticmethod\n\tdef input(chunks: List[Document])->tuple:\n\t\t\"\"\"\n\t\tConvert a list of Langchain Documents to inputs for ChromaDB\n\t\tArgs:\n\t\t\tchunks (List[Document])\n\t\tReturns:\n\t\t\tcontents (List[str]): pure text\n\t\t\tids (List[str])\n\t\t\tmetadatas (List[str]): metadata of pdf\n\t\t\"\"\"\n\t\tcontents = [doc.page_content for doc in chunks]\n\t\tids = [str(i) for i in range(len(chunks))]\n\t\tmetadatas=[doc.metadata for doc in chunks]\n\t\tprint(f\"metadatas: {metadatas}\")\n\t\treturn contents, ids, metadatas\n\tdef add_chunks(self, chunks)->None:\n\t\t\"\"\"\n\t\tAdd a list of Langchain Documents to ChromaDB collection\n\t\tArgs:\n\t\t\tchunks (List[Document])\n\t\t\"\"\"\n\t\tcontents, ids, metadatas = self.input(chunks)\n\t\tself.collection.add(documents=contents, ids=ids, metadatas=metadatas)" 
+ "\n\t\tprint(f\"number of chunks added to collection: {len(contents)}\")\n\nclass Filter:\n\tdef __init__(self, document_content_description: str):\n\t\tmetadata_field_info = self.get_pydantic_attributes()\n\t\tllm = ChatOpenAI(openai_api_key=self.get_openai_api_key(), temperature=0)\n\t\toutput_parser = StructuredQueryOutputParser.from_components()\n\t\tprompt =  get_query_constructor_prompt(\n\t\t\tdocument_contents=document_content_description,\n\t\t\tattribute_info=metadata_field_info\n\t\t)\n\t\tself.query_constructor = prompt | llm | output_parser\n\tdef get_pydantic_attributes(self, model:BaseModel=PDFModel)->List:"
+ "\n\t\t\"\"\"\n\t\tDynamically convert pydantic model to a list of AttributeInfo\n\t\tArgs:\n\t\t\tmodel (BaseModel): Pydantic Model \n\t\tReturns:\n\t\t\tmetadata_field_info (List[AttributeInfo])\n\t\t\"\"\"\n\t\tmetadata_field_info = []\n\t\tfieldnames = model.__fields__\n\t\tfor field, field_info in fieldnames.items():\n\t\t\tprint(f\"{field}: {field_info.annotation}\")\n\t\t\tif field_info.annotation is str:\n\t\t\t\tdatatype=\"string\"\n\t\t\telif field_info.annotation is int:\n\t\t\t\tdatatype=\"integer\"\n\t\t\telif field_info.annotation is float:\n\t\t\t\tdatatype=\"float\"\n\t\t\telif field_info.annotation is bool:\n\t\t\t\tdatatype=\"boolean\"\n\t\t\telif field_info.annotation is List:\n\t\t\t\tdatatype=\"array\"\n\t\t\telif field_info.annotation is dict:\n\t\t\t\tdatatype=\"object\""
+ "\n\t\t\telse:\n\t\t\t\traise ValueError(\"Unable to process datatype\")\n\t\t\tattribute=AttributeInfo(name=field,description=field,type=datatype)\n\t\t\tmetadata_field_info.append(attribute)\n\t\treturn metadata_field_info\n\tdef get_openai_api_key(self):\n\t\tif not os.path.exists(\"config.env\"):\n\t\t\traise FileNotFoundError(f\"Required OPENAI KEY Configuration File\")\n\t\tdotenv.load_dotenv(\"config.env\")\n\t\topenai_api_key=os.getenv(\"OPENAI_API_KEY\")\n\t\treturn openai_api_key\n\n\tdef construct_translator(self, pdf_file: str)->Dict[str,str]:\n\t\t\"\"\"\n\t\tCreates a filename translator that checks if chunks' metadata field equals to pdf_file \n\t\tArgs: \n\t\t\tpdf_file (str): target filename to filter"
+ "\n\n\t\tReturns:\n\t\t\ttranslated_query (Dict[str]): a query based on metadata language\n\t\t\"\"\"\n\t\tsearch_filter = PDFModel(filename=pdf_file)\n\t\tif search_filter.filename is not None:\n\t\t\tcomparison = Comparison(comparator=Comparator.EQ,attribute=\"filename\",value = search_filter.filename)\n\t\t\ttranslator = ChromaTranslator()\n\t\t\ttranslated_query = translator.visit_comparison(comparison)\n\t\t\treturn translated_query\nif __name__ == \"__main__\":"
+ "\n\n\tparser=LlamaPDFParser()\n\tfilename=\"finance.pdf\"\n\tpdf_path=os.path.join(os.getcwd(), \"source\", filename)\n\tchunks=parser.parse_pdf_to_document(pdf_path=pdf_path, export_dir=\"export\")\n\tchroma_database=ChromaDB(collection_name=\"my_collection\", persist_path=\"chroma_db\")"
+ "\n\tfilter = Filter(document_content_description=\"this is about my document\")\n\tchroma_database.add_chunks(chunks)\n\ttranslated_query = filter.construct_translator(pdf_file=filename)\n\tcollection=chroma_database.get_collection()\n\tfilter.get_all_vectors(collection)"
+ "\n\tcollection.delete(where=translated_query)\n\tfilter.get_all_vectors(collection)\n```"

const hfPipeline1 = "### HuggingFace RAG Pipeline\n\nclass Database:\n\tdef __init__(self, path: str, collection_name: str, embedding_function):\n\t\tclient = chromadb.PersistentClient(path=path)\n\t\tself.db = Chroma(\n\t\t\tclient=client,collection_name=collection_name,embedding_function=embedding_function)\n\n\tdef get_db(self):\n\t\treturn self.db\ndef load_embedding_func(model_id=\"BAAI/bge-m3\", device=None,  batch_size=32) -> HuggingFaceEmbeddings:\n\tif device is None:\n\t\tdevice = torch.device('cuda' if torch.cuda.is_available() else 'cpu')\n\tembeddings = HuggingFaceEmbeddings(model_name=model_id,\n\t\tmodel_kwargs={'device': device},\n\t\tencode_kwargs={'normalize_embeddings': False, 'batch_size': batch_size}\n\t)\n\treturn embeddings\n\ntokenizer = AutoTokenizer.from_pretrained(exp_grip['LLM_MODEL_ID'])\nmodel = AutoModelForCausalLM.from_pretrained(exp_grip['LLM_MODEL_ID'])\ndb = Database(\n\tpath=\"./mnt\", \n\tcollection_name=COLLECTION_NAME, \n\tembedding_function=load_embedding_func()\n).get_db()\n\ngenerate_text = pipeline(\n\tmodel=model, \n\ttokenizer=tokenizer,\n\treturn_full_text=False, # only reply answer\n\ttask='text-generation',\n\tdevice=DEVICE,\n\ttemperature=0.0001,\n\tmax_new_tokens=512,\n\trepetition_penalty=1.1\n)\n\nllm = HuggingFacePipeline(pipeline=generate_text)\n\nretriever = db.as_retriever(search_kwargs={\"k\": TOP_K})\nrag_pipeline = RetrievalQA.from_chain_type(\n\t# chain_type_kwargs=chain_type_kwargs,\n\treturn_source_documents=True,\n\tllm=llm, \n\tchain_type='stuff', \n\tretriever=retriever, \n)\n\nif __name__ == '__main__':\n\tquestion = \"Is Hirschsprung disease a mendelian or a multifactorial disorder?\"\n\tresult = rag_pipeline({\"query\": question})\n\tprint('---'*20)\n\tdocs = db.similarity_search(question)\n\tprint('docs:', docs)\n\tprint(result)\n\t# print(result['result'])"

const nodeData = [
    {
        id: "Embedding-1",
        data: {label: Embedding1},
        position: {x: 0, y: 300},
        class: 'light',
        type: 'custom',
    },
    {
        id: "Embedding-2",
        data: {label: Embedding2},
        position: {x: 0, y: 800},
        class: 'light',
        type: 'custom'
    },
    {
        id: "Embedding-3",
        data: {label: Embedding3},
        position: {x: 0, y: 1300},
        class: 'light',
        type: 'custom'
    },
    {
        id: "Encoder-1",
        data: {label: Encoder1},
        position: {x: 800, y: 100},
        class: 'light',
        type: 'custom'
    },
    {
        id: "finetuneEmbed-1",
        data: {label: finetuneEmbedding1},
        position: {x: 800, y: 700},
        class: 'light',
        type: 'custom'

    },
    {
        id: "finetuneEmbed-2",
        data: {label: finetuneEmbedding2},
        position: {x: 800, y: 1100},
        class: 'light',
        type: 'custom'

    },
    {
        id: "finetuneEmbed-3",
        data: {label: finetuneEmbedding3},
        position: {x: 800, y: 1600},
        class: 'light',
        type: 'custom'

    },
    {
        id: "finetuneEmbed-4",
        data: {label: finetuneEmbedding4},
        position: {x: 800, y: 2200},
        class: 'light',
        type: 'custom'

    },
    {
        id: "finetuneEmbed-5",
        data: {label: finetuneEmbedding5},
        position: {x: 800, y: 2300},
        class: 'light',
        type: 'custom'
    },
    {
        id: "sentenceTransformer-1",
        data: {label: sentenceTransformerEngine1},
        position: {x: 1700, y: 150},
        class: 'light',
        type: 'custom'
    },
    {
        id: "sentenceTransformer-2",
        data: {label: sentenceTransformerEngine2},
        position: {x: 1700, y: 1150},
        class: 'light',
        type: 'custom'
    },
    {
        id: "agent-1",
        data: {label: agent1},
        position: {x: 2500, y: 100},
        class: 'light',
        type: 'custom'
    },
    {
        id: "agent-2",
        data: {label: agent2},
        position: {x: 2500, y: 600},
        class: 'light',
        type: 'custom'
    },
    {
        id: "agent-3",
        data: {label: agent3},
        position: {x: 2500, y: 3000},
        class: 'light',
        type: 'custom'
    },
    {
        id: "tools-1",
        data: {label: tools1},
        position: {x: 3500, y: 100},
        class: 'light',
        type: 'custom'
    },
    {
        id: "tools-2",
        data: {label: tools2},
        position: {x: 3500, y: 1100},
        class: 'light',
        type: 'custom'
    },
    {
        id: "tools-3",
        data: {label: tools3},
        position: {x: 3500, y: 1600},
        class: 'light',
        type: 'custom'
    },
    {
        id: "tools-4",
        data: {label: tools4},
        position: {x: 3500, y: 2200},
        class: 'light',
        type: 'custom'
    },
    {
        id: "filter-1",
        data: {label: filter1},
        position: {x: 4400, y: 100},
        class: 'light',
        type: 'custom'
    },
    {
        id: "filter-2",
        data: {label: filter2},
        position: {x: 4400, y: 700},
        class: 'light',
        type: 'custom'
    },
    {
        id: "filter-3",
        data: {label: filter3},
        position: {x: 4400, y: 1600},
        class: 'light',
        type: 'custom'
    },
    {
        id: "hf-pipeline-1",
        data: {label: hfPipeline1},
        position: {x: 5200, y: 100},
        class: 'light',
        type: 'custom'
    },




]

export default nodeData;