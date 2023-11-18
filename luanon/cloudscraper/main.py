from luanon.cloudscraper.cf_main import CloudflareScraper

if __name__ == "__main__":
    cf = CloudflareScraper(cf_max_retries=1, cf_debug=True)
    resp = cf.get("https://nowsecure.nl/")
    print(f"Status code: {resp.status_code}")
    print(f"Source: {resp.text}")