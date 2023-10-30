import socket
import random

class RemoteConnection(socket.socket):
	
	def __init__(self, accept_time_out):
		socket.setdefaulttimeout(accept_time_out)
		super(RemoteConnection, self).__init__(socket.AF_INET, socket.SOCK_STREAM)
		
		self.max_listen = 128
		self.max_recv = 4096
		self.host = "127.0.0.1"
		self.port = random.randint(1000, 9999)
		
		self.init_socket_server()
	
	def init_socket_server(self):
		self.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
		while True:
			try:
				self.bind((self.host, self.port))
				break
			except OSError:
				self.port = random.randint(1000, 9999)
		self.listen(self.max_listen)