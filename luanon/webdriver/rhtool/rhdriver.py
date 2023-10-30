from dataclasses import dataclass

from tab import Tab
from rhdriver_manager import RHDriverManager

@dataclass
class RHDriver:
    
    use_ipv4: bool=True
    use_ipv6: bool=False
    
    def __init__(self) -> None:
        # RHDriverManager.open(self.use_ipv4, self.use_ipv6)
        print("Done")
    
    def new_tab(self, start_url: str="https://www.google.com/") -> Tab:
        return Tab(start_url, self.use_ipv4, self.use_ipv6).create()

import threading
threading.Thread(target=RHDriver().new_tab).start()
threading.Thread(target=RHDriver().new_tab).start()
import time
time.sleep(10)
threading.Thread(target=RHDriver().new_tab).start()
threading.Thread(target=RHDriver().new_tab).start()