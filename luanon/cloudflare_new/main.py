from luanon.cloudflare_new.cf_main import CloudflareScraper

cf = CloudflareScraper()
resp = cf.get("https://fb.com/")
print(resp)
