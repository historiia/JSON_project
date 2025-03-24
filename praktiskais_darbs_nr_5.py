import requests
import json

def make_get_request(url, headers=None, params=None):
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status() 

        try:
            json_response = response.json()
        except json.JSONDecodeError:
            json_response = None  

        return response, json_response

    except requests.exceptions.RequestException as e:
        print(f"Error making GET request: {e}")
        return None, None
    
# Example usage:
url = "https://poetrydb.org/title/love/title,author.json"
response, json_response = make_get_request(url)

if response:
    print("Status Code:", response.status_code)
    if json_response:
        print("JSON Response:", json.dumps(json_response, indent=4))

#Example usage with query parameters
url_with_params = "https://poetrydb.org/author/William Shakespear/title,linecount.json"
#params = {"postId":1}
response_with_params, json_response_with_params = make_get_request(url_with_params) #, params=params

if response_with_params:
  print("Status Code with params:", response_with_params.status_code)
  if json_response_with_params:
    print("JSON Response with params:", json.dumps(json_response_with_params, indent=4))