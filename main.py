import http.server

# 创建服务器对象
server = http.server.HTTPServer(('', 8000), http.server.SimpleHTTPRequestHandler)

# 启动服务器
server.serve_forever()