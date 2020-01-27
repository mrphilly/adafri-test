from googleads import adwords

def TargetYoutubeChannels(client, ad_group_id, channels): 
  INFOS = []
  adgroup_criterion_service = client.GetService(
      'AdGroupCriterionService', version='v201809')
  for channel in channels:  
    operations = []
    operations.append({
          'operator': 'ADD',
          'operand':{
            'xsi_type': 'BiddableAdGroupCriterion',
            'adGroupId': ad_group_id,
            'criterion': {
                'xsi_type': 'YouTubeChannel',
                'channelId': channel
            }
        }
      })
    result = adgroup_criterion_service.mutate(operations)
    for adgroup_criterion in result['value']:
      INFOS.append({
          "id": channel,
          "criterion_id": adgroup_criterion['criterion']['id'],
      })
      print ('Ad group criterion with ad group ID %s, criterion ID %s, channel %s, and '
              'type "%s" was added.'
            % (adgroup_criterion['adGroupId'],
                adgroup_criterion['criterion']['id'],
                channel,
                adgroup_criterion['criterion']['type']))
  return INFOS




def RemoveYoutubeChannels(client, ad_group_id, channel): 
  response = []
  adgroup_criterion_service = client.GetService(
      'AdGroupCriterionService', version='v201809')

  operations = [{
          'operator': 'REMOVE',
          'operand':{
            'xsi_type': 'BiddableAdGroupCriterion',
            'adGroupId': ad_group_id,
            'criterion': {
                'xsi_type': 'YouTubeChannel',
                'id': channel
            }
        }
      }]
  result = adgroup_criterion_service.mutate(operations)
  if result and result['value']:
     response.append({"status": "ok"})
  return response

