#!/usr/bin/env python
#
# Copyright 2016 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""This example adds a responsive display ad to a given ad group.

To get ad_group_id, run get_ad_groups.py.

The LoadFromStorage method is pulling credentials and properties from a
"googleads.yaml" file. By default, it looks for this file in your home
directory. For more information, see the "Caching authentication information"
section of our README.

"""

from flask import Flask, render_template, request, session, redirect, url_for,send_from_directory, jsonify
from urllib.request import build_opener, Request, urlopen
from requests_html import HTMLSession
import gzip
from googleads import adwords
import base64
from PIL import Image
from io import BytesIO
import sys
import os
import io
import tinify
import binascii
import datetime
import pngquant
import requests
import json
from json import JSONEncoder


def UploadImageAsset(client, url, image_ref_on_file, image_name, width, height, mode):
  """Uploads the image from the specified url.
  Args:
    client: An AdWordsClient instance.
    url: The image URL.
  Returns:
    The ID of the uploaded image.
  """
  # Initialize appropriate service.
  asset_service = client.GetService('AssetService', version='v201809')

  # Download the image.
  headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
    }
  session__ = HTMLSession()
  """ image_request = session__.get(url, headers=headers, verify=True)
  #print("URL: "+ url)
  print(image_request.content)
  print(image_request.html) """
  print(url)
  tab = url.split('&')
  #print(type(url))
  image_request = session__.get(tab[0], headers=headers, verify=True)
  #print(tab[0])
  #image_asset = BytesIO(urlopen(tab[0]).read())
  image_asset = image_request.content
  #print(image_asset)

  # Create the image asset.
  try:
    source = tinify.tinify.tinify.from_url(url)
    #print(source)
    resized_image = source.resize(method=mode, width=int(width), height=int(height))
    data = resized_image.to_file(image_ref_on_file)
    #print(sys.getsizeof(data))
    #print(data)
  except:
    try:
      source = tinify.tinify.tinify.from_url(url)
      print(source)
      resized_image = source.resize(method=mode, width=int(width), height=int(height))
      data = resized_image.to_file(image_ref_on_file)
      print(sys.getsizeof(data))
      #print(data)
    except Exception as e:
      print(e)
  print(image_name)
  file_url = url_for('uploaded_file', filename=image_name, _external=True)
  image_asset = {
      'xsi_type': 'ImageAsset',
      'imageData': urlopen(file_url).read(),
      # This field is optional, and if provided should be unique.
      # 'assetName': 'Image asset ' + str(uuid.uuid4()),
  }

  # Create the operation.
  operation = {
      'operator': 'ADD',
      'operand': image_asset
  }

  # Create the asset and return the ID.
  result = asset_service.mutate([operation])

  
  return result['value'][0]['assetId']


def add_responsive_display_ad(client, ad_group_id, url, name, description, businessName, finalUrls, finalAppsUrls, finalMobileUrls, width, height):
  # Initialize appropriate services.
  response = []
  ad_group_ad_service = client.GetService('AdGroupAdService', version='v201809')
  image_name = name + ".png"
  image_name_rectangle = "rect"+name + ".png"
  image_ref_on_file ='uploads/' +image_name
  image_ref_on_file_rectangle ='uploads/' +image_name_rectangle
  #mediaId = UploadImageAsset(client, url, image_ref_on_file, image_name, width, height)
  
  operations = [{
        'operator': 'ADD',
        'operand': {
            'xsi_type': 'AdGroupAd',
            'adGroupId': ad_group_id,
            'ad': {
           'xsi_type': 'MultiAssetResponsiveDisplayAd',
           'headlines': [{
          'asset': {
              'xsi_type': 'TextAsset',
              'assetText': name
          }
           }],
          'descriptions': [{
          'asset': {
              'xsi_type': 'TextAsset',
              'assetText': description,
          }
      }],
       'businessName': businessName,
        'longHeadline': {
          'asset': {
              'xsi_type': 'TextAsset',
              'assetText': description,
          }
      },
         'marketingImages': [{
          'asset': {
              'xsi_type': 'ImageAsset',
              'assetId':UploadImageAsset(client, url, image_ref_on_file_rectangle, image_name_rectangle, width, height, "fit")
          }
      }],
       'squareMarketingImages': [{
          'asset': {
              'xsi_type': 'ImageAsset',
              'assetId': UploadImageAsset(client, url, image_ref_on_file, image_name, '300','300', "cover")
          }
      }],
            
        'finalUrls': final_url,
       
        
        },
       
            'status': 'PAUSED'

            },
            # Optional fields.
        }for final_url in finalUrls]
  

    # Make the mutate request.
  ads = ad_group_ad_service.mutate(operations)

    # Display results.
  if 'value' in ads:
    for ad in ads['value']: 
      response.append({
            "ad_id": ad['ad']['id'],
            "name": image_name,
            "status": ad['status'],
            "displayUrl": ad['ad']['displayUrl'],
            "finalUrls": ad['ad']['finalUrls'],
            "finalMobileUrls": ad['ad']['finalMobileUrls'],
            "finalAppUrls": ad['ad']['finalAppUrls'],
            "automated": ad['ad']['automated'],
            "referenceId": [{"squareMarketingReferenceId": ad['ad']['squareMarketingImages'][0]['asset']['assetId'], "marketingReferenceId": ad['ad']['marketingImages'][0]['asset']['assetId']}],
            "url_image":  url

          })

  
  

  return response
    #raise Exception('Failed to create responsive display ad.')








