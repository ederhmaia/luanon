# from luanon.cloudflare_new.cf_body.cf_request_body import CfRequestBody
# print(CfRequestBody("5MSzLz$zhzlzazV2B2zX2zg7jB9EWLiy+zf7zylSyNzTSfryWzjaJz98AyTyY2fBcSySeLWyUeyH7YfuIBYKyY1lyJzjmypv0eypKeymyMzpVGy-EmNeyje9W9GzpjFGTxeLrZNzjlyuif4+eyf6ysa78PeyvgIxVWv7ypWnyIifySr-hyfDNpxMMLTmlqyeSkmf8XzysAhIWgjJyLl5RjeM44K8yeP27yLXhBXABfSxhQX+nAJy$YTaGA8tzEmFLkyyZ-huzNi8JyT7sPPapGxPnK9aRsuuK1ztK893v7huR-qjS4Brs99okx7GIdJ7TrG22NP2jTiAqHPeyop3Bf2JiFcRaAKzy9GDeSyBaML3riI3FjJ42G6f2TyyDzyW7Ys9JhQeFyyY7vaAeGDqWyfms9z9X+M+eMjxY9zMjQ4$hjX9Gky9gIL5ch5IVRj++-oyZBW+GU-B+-P92JyzxT9BGcNQUGBXcj+Oe9NP+e-zyAZ6Dz2yp+6GagXaGj+6$r2BesX5WItnX+JSUcgeKRQO3S7b7-pFOY0KiFBU3+ResjS+FBJKth5c3ojZqxWeZ6V7mqa4$rvpF3vB8jtfgnBgqY2zIRJ7RSSq249z7XagRxLSaMmxgyxW-aYyxYo+3+-BI26S-KvJ+uF1gAJyQM8-3oQKodY1lxXJjRzZyxOItYjJFSjN-xqR7vyG4e-a3smmTmA2kI3saKv6A28XcyJxTWTyZi+Gxx9DGxGsATzZXUsaGLj-xYuVI2SuJR74TlIQymJIa3i8TyueWW6-jBsQhpJ4-Mhz9Jk-Dk-pLPAmM9De28yjR7FjaGviI3QZBWnSeKXU3nFy2QQDyzfQKxzfQG92Y7NuVS-dIAWxPX+eQWpDVlEE8LxMx2LySjBQyDxzPjs9zQl9377QLT84-W93Tl+hVsmSflZa4hl-xNyhkFOTfQlmh3I+hXUsQzv+TzJKS9vBv7B-vmSG2ZT8QySpJs2-yhy-OsNgyZp86ZO3SQ-yhzLzx9Bpx6Pm-xg9X7zuWSIXKqjBepiAWxRXU32+qjGvGXPIjIyGy-WyeP+KmJB9dPVgsGul-IRy2G22pfPvLjffyIjageZhAS-cfMUDH9jez-p+33O8SjVxxj9Gmfls2IX69JphzfQLXcLx6eGgyajOgx9+3ejjy-fza974URfMsaYmn9+cvJ67-X+9+hG3PcgjNTpeLzA+uX7QQGzuQ9WyMfzmPe7SSmfsnapSKyZX75URTmPXfLE574TJK9BzhT9B-DQl-fj$aBqZgeDvr22+zeWrorUDlCTeQe40WxykIye0KiJfy69MLz+hiQyHXAYyMP5cxlT2G2sLWk-GTv0aPTu$aYyz9yHL35UN9B$piVZvzmi+sxLj8IaMh3kymLjQS7jfsvB38eS7$y4SZfeQ-4ifVlSuULzuezy-1jnezZXG0XGfUMQB-7IXOfiVJIThj-4v79+fXaTlSvTZz+uhy-4AMgz6jUPmDhj-xRX1e2phepyjTlVZgX+QuBWTDy6uz5gPjSp9YyjP2-j7RUnX6kXzu8-SW9GehjJS2-2Le2L8LWQ7PjDyHN3fjyhyyoxe-OnzJfMvGpz3ydxg9hT8QJsyXxP9llf9jPmbzg92XUyiPYEzYyOfzKjY7K9fjWLW5MLxv8gfsXajJPe3xNjzjnReWzeJxT3hW9o$eYfeLjLsqU5yHS89IjBSeQ9ey", "y9fLjXpTSQYgB5KRe-AI3sWP7UG$6V4kzxhqmviuJ+O18FHo2ar0lZEdMcNtnDCbw").decode())
from luanon.cloudflare_new.cf_main import CloudflareScraper

if __name__ == "__main__":
    cf = CloudflareScraper(cf_max_retries=1, cf_debug=True)
    resp = cf.get("https://nowsecure.nl/")
    print(f"Status code: {resp.status_code}")
    print(f"Source: {resp.text}")
# from jsdom_runtime import JSDomRuntime
#
# a = JSDomRuntime(script="window._cf_chl_opt=5").eval("window._cf_chl_opt")
# print(a)