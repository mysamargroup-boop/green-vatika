import os
import sys
import json
import urllib.request
import urllib.parse
from google.oauth2.service_account import Credentials
from google.auth.transport.requests import Request

SERVICE_ACCOUNT_PATH = r"d:\school-erp-platform\scripts\google_service_account.json"

URLS_TO_INDEX = [
    "https://greenvatika.co/",
    "https://greenvatika.co/shop",
    "https://greenvatika.co/categories",
    "https://greenvatika.co/about",
    "https://greenvatika.co/services",
    "https://greenvatika.co/blog",
    "https://greenvatika.co/contact",
    "https://greenvatika.co/quiz",
    "https://green-vatika.pages.dev/",
    "https://green-vatika.pages.dev/shop",
    "https://green-vatika.pages.dev/categories",
    "https://green-vatika.pages.dev/about",
    "https://green-vatika.pages.dev/services",
    "https://green-vatika.pages.dev/blog",
    "https://green-vatika.pages.dev/contact",
    "https://green-vatika.pages.dev/quiz",
]

def submit_urls():
    if not os.path.exists(SERVICE_ACCOUNT_PATH):
        print(f"[Error]: Service account file not found at {SERVICE_ACCOUNT_PATH}")
        return

    print("=== GOOGLE INDEXING API AUTOMATION ===")
    print(f"Service Account: {SERVICE_ACCOUNT_PATH}")
    
    creds = Credentials.from_service_account_file(
        SERVICE_ACCOUNT_PATH,
        scopes=['https://www.googleapis.com/auth/indexing']
    )
    creds.refresh(Request())
    token = creds.token
    print("OAuth Access Token generated successfully.")

    endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish"

    results = []
    for url in URLS_TO_INDEX:
        payload = json.dumps({
            "url": url,
            "type": "URL_UPDATED"
        }).encode("utf-8")

        req = urllib.request.Request(
            endpoint,
            data=payload,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
        )

        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode())
                print(f"[SUCCESS]: {url} -> Notified: {data.get('urlNotificationMetadata', {}).get('latestUpdate', {}).get('notifyTime')}")
                results.append({"url": url, "status": "SUCCESS", "data": data})
        except Exception as e:
            err_msg = ""
            if hasattr(e, 'read'):
                try:
                    err_data = json.loads(e.read().decode())
                    err_msg = err_data.get('error', {}).get('message', str(e))
                except Exception:
                    err_msg = str(e)
            else:
                err_msg = str(e)
            print(f"[NOTICE]: {url} -> {err_msg}")
            results.append({"url": url, "status": "PENDING_OWNERSHIP_VERIFICATION", "message": err_msg})

    return results

if __name__ == "__main__":
    submit_urls()
