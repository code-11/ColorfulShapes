from flask import Flask, request
# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='')

@app.route('/')
def root():
	return app.send_static_file("site/index.html")

@app.route("/viewer")
def viewer():
    return app.send_static_file("pdfViewer/web/viewer.html")

if __name__ == "__main__":
    app.run()