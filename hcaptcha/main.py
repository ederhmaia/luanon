from hcaptcha import HCaptcha

if __name__ == "__main__":
    host = "nopecha.com"
    hcaptcha_key = "ab803303-ac41-41aa-9be1-7b4e01b91e2c"
    hcaptcha = HCaptcha(host, hcaptcha_key, debug=True)
    print("Result:", hcaptcha.solve(href="https://nopecha.com/demo/hcaptcha#hard", worker=2))
