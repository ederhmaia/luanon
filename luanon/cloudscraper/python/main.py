from cloudscraper import CloudScraper

# if __name__ == "__main__":
def a():
    try:
        scraper = CloudScraper(max_retries=1, debug=False)
        resp = scraper.get("https://aapanelx.tk")
        print(f"Status code: {resp.status_code}")
        print(f"Source: {resp.text}")
    except:
        pass

import threading
for i in range(20):
    threading.Thread(target=a).start()