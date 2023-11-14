from luanon.cloudscraper.cf_main import CloudflareScraper

if __name__ == "__main__":
    cf = CloudflareScraper(cf_max_retries=3, cf_debug=True)
    resp = cf.get("https://nowsecure.nl/", proxies={"http": "http://localhost:8000", "https": "http://localhost:8000"}, verify=False)
    print(f"Status code: {resp.status_code}")
    print(f"Source: {resp.text}")