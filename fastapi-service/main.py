from fastapi import FastAPI


app = FastAPI()

@app.get("/test")
def test_get():
    return {"test":"TEST"}

@app.post("testPOST")
def test_get():
    pass
