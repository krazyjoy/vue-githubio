## 目標 —  如何針對 metadata 進行 Filter？
Study how Langchain construct filters
- How to define filter's `metadata field` and `construct_comparison` ？ — [doc](https://python.langchain.com/v0.2/docs/how_to/query_constructing_filters/)
- What are the functions of Comparator ([code](https://api.python.langchain.com/en/latest/structured_query/langchain_core.structured_query.Comparator.html)), Comparison ([code](https://api.python.langchain.com/en/latest/structured_query/langchain_core.structured_query.Comparison.html)) and Operation ([code]()) ？
-  Integrate Translator to obtain filter's usage and test its feasibility 
    - example: for every pdf with common source_id or file_name, can we filter out all the chunks from this pdf
- Advanced - can comparators adjust dynamically


### Definitions

library: `langchain_core.structured_query`
- Comparator 
    - A Enumerator (枚舉物件) includes `EQ`, `NE`, `GT`, `GTE`, `LT`, `LTE`, `CONTAIN`, `LIKE`, `IN`, `NIN` comparison operators

- Comparison
    - comparison to a value

    ```python

    Comparison(
                comparator=Comparator.GT,
                attribute="start_year",
                value=query.start_year,
            )
    ```

- Operation
    - Llogical operation over other directives. 對 comparisons 進行邏輯運算

    ```python
    _filter = Operation(operator=Operator.AND, arguments=comparisons)
    ```








#### nodes

const filter1 = "## Filter - Goal - How to Filter Metadata ? \nStudy how Langchain construct filters
\n- How to define filter's `metadata field` and `construct_comparison` ？ — [doc](https://python.langchain.com/v0.2/docs/how_to/query_constructing_filters/)\n- What are the functions of Comparator ([code](https://api.python.langchain.com/en/latest/structured_query/langchain_core.structured_query.Comparator.html)), Comparison ([code](https://api.python.langchain.com/en/latest/structured_query/langchain_core.structured_query.Comparison.html)) and Operation ([code]()) ？\n-  Integrate Translator to obtain filter's usage and test its feasibility \n\t- example: for every pdf with common source_id or file_name, can we filter out all the chunks from this pdf\n- Advanced - can comparators adjust dynamically
"

const filter2 = "### Definitions\nlibrary: `langchain_core.structured_query`\n- Comparator 
\n\t- A Enumerator (枚舉物件) includes `EQ`, `NE`, `GT`, `GTE`, `LT`, `LTE`, `CONTAIN`, `LIKE`, `IN`, `NIN` comparison operators\n- Comparison\n\t- comparison to a value\n\t```python\n\tComparison(comparator=Comparator.GT, attribute="start_year", value=query.start_year,)\n\t```\n- Operation\n\t- Llogical operation over other directives. 對 comparisons 進行邏輯運算\n\t```\n\tfilter = Operation(operator=Operator.AND, arguments=comparisons)\n\t```"




const filter3 = "```class ChromaDB:\n\tdef __init__(self, collection_name: str, persist_path: str):\n\t\t"""\n\t\tInitiate ChromaDB instance\n\t\tArgs:\n\t\t\tcollection_name (str): name of collection\n\t\t\tpersist_path (str): path to install chromadb \n\t\t"""\n\t\tself.chroma_client=chromadb.PersistentClient(path=persist_path)\n\t\tself.collection = self.chroma_client.get_or_create_collection(name=collection_name)\n\n\tdef get_collection(self):\n\t\t\"\"\"\n\t\tRetrieve collection\n\t\t"""\n\t\treturn self.collection\n\t@staticmethod\n\tdef input(chunks: List[Document])->tuple:\n\t\t"""\n\t\tConvert a list of Langchain Documents to inputs for ChromaDB\n\t\tArgs:\n\t\t\tchunks (List[Document])\n\t\tReturns:\n\t\t\tcontents (List[str]): pure text\n\t\t\tids (List[str])\n\t\t\tmetadatas (List[str]): metadata of pdf\n\t\t\"\"\"\n\t\tcontents = [doc.page_content for doc in chunks]\n\t\tids = [str(i) for i in range(len(chunks))]\n\t\tmetadatas=[doc.metadata for doc in chunks]\n\t\tprint(f"metadatas: {metadatas}")\n\t\treturn contents, ids, metadatas\n\tdef add_chunks(self, chunks)->None:\n\t\t\"\"\"\n\t\tAdd a list of Langchain Documents to ChromaDB collection\n\t\tArgs:\n\t\t\tchunks (List[Document])\n\t\t\"\"\"\n\t\tcontents, ids, metadatas = self.input(chunks)\n\t\tself.collection.add(documents=contents, ids=ids, metadatas=metadatas)\n\t\tprint(f\"number of chunks added to collection: {len(contents)}\")\n\nclass Filter:\n\tdef __init__(self, document_content_description: str):\n\t\tmetadata_field_info = self.get_pydantic_attributes()\n\t\tllm = ChatOpenAI(openai_api_key=self.get_openai_api_key(), temperature=0)\n\t\toutput_parser = StructuredQueryOutputParser.from_components()\n\t\tprompt =  get_query_constructor_prompt(\n\t\t\tdocument_contents=document_content_description,\n\t\t\tattribute_info=metadata_field_info\n\t\t)\n\t\tself.query_constructor = prompt | llm | output_parser\n\tdef get_pydantic_attributes(self, model:BaseModel=PDFModel)->List:
\n\t\t\"\"\"\n\t\tDynamically convert pydantic model to a list of AttributeInfo\n\t\tArgs:\n\t\t\tmodel (BaseModel): Pydantic Model \n\t\tReturns:\n\t\t\tmetadata_field_info (List[AttributeInfo])\n\t\t"""\n\t\tmetadata_field_info = []\n\t\tfieldnames = model.__fields__\n\t\tfor field, field_info in fieldnames.items():\n\t\t\tprint(f"{field}: {field_info.annotation}")\n\t\t\tif field_info.annotation is str:\n\t\t\t\tdatatype="string"\n\t\t\telif field_info.annotation is int:\n\t\t\t\tdatatype="integer"\n\t\t\telif field_info.annotation is float:\n\t\t\t\tdatatype="float"\n\t\t\telif field_info.annotation is bool:\n\t\t\t\tdatatype="boolean"\n\t\t\telif field_info.annotation is List:\n\t\t\t\tdatatype="array"\n\t\t\telif field_info.annotation is dict:\n\t\t\t\tdatatype="object"
\n\t\t\telse:\n\t\t\t\traise ValueError("Unable to process datatype")
\n\t\t\tattribute=AttributeInfo(name=field,description=field,type=datatype)\n\t\t\tmetadata_field_info.append(attribute)\n\t\treturn metadata_field_info\n\tdef get_openai_api_key(self):\n\t\tif not os.path.exists("config.env"):\n\t\t\traise FileNotFoundError(f"Required OPENAI KEY Configuration File")\n\t\tdotenv.load_dotenv("config.env")\n\t\topenai_api_key=os.getenv("OPENAI_API_KEY")\n\t\treturn openai_api_key
\n\n\tdef construct_translator(self, pdf_file: str)->Dict[str,str]:
\n\t\t\"\"\"\n\t\tCreates a filename translator that checks if chunks' metadata field equals to pdf_file \n\t\tArgs: \n\t\t\tpdf_file (str): target filename to filter
\n\n\t\tReturns:\n\t\t\ttranslated_query (Dict[str]): a query based on metadata language\n\t\t\"\"\"
\n\t\tsearch_filter = PDFModel(filename=pdf_file)\n\t\tif search_filter.filename is not None:
\n\t\t\tcomparison = Comparison(comparator=Comparator.EQ,attribute="filename",value = search_filter.filename)\n\t\t\ttranslator = ChromaTranslator()\n\t\t\ttranslated_query = translator.visit_comparison(comparison)\n\t\t\treturn translated_query\nif __name__ == "__main__":
\n\n\tparser=LlamaPDFParser()\n\tfilename="finance.pdf"\n\tpdf_path=os.path.join(os.getcwd(), "source", filename)\n\tchunks=parser.parse_pdf_to_document(pdf_path=pdf_path, export_dir="export")\n\tchroma_database=ChromaDB(collection_name="my_collection", persist_path="chroma_db")
\n\tfilter = Filter(document_content_description="this is about my document")\n\tchroma_database.add_chunks(chunks)\n\ttranslated_query = filter.construct_translator(pdf_file=filename)\n\tcollection=chroma_database.get_collection()\n\tfilter.get_all_vectors(collection)
\n\tcollection.delete(where=translated_query)\n\tfilter.get_all_vectors(collection)\n```"
