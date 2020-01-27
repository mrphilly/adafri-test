#!/usr/bin/env python
from googleads import adwords



GENDER_MALE = '10'
GENDER_FEMALE = '11'
UNDETERMINED_GENDER = '20'
AGE_RANGE_UNDETERMINED = '503999'

AD_GROUP_ID = '72362966135'

#Function for only target male ==> disable female et undetermined
def TargetSexe(client, ad_group_id, sexes):
  result = []
  SEXES = ["10", "11", "20"]

  ad_group_criteria = []
  ad_group_criterion_service = client.GetService(
        'AdGroupCriterionService', version = 'v201809')
  if len(sexes) != len(SEXES):
    for sexe in sexes:
        if str(sexe) in SEXES:
          SEXES.remove(str(sexe)) 
    ad_group_criteria = [
        # Exclusion criterion.
        {
            'xsi_type': 'NegativeAdGroupCriterion',
            'adGroupId': ad_group_id,
            'criterion': {
                'xsi_type': 'Gender',
                'id': _sexe_
            }
        }
    for _sexe_ in SEXES]
    print(ad_group_criteria)
  else:
     ad_group_criteria = [
        # Exclusion criterion.
        {
            'xsi_type': 'BiddableAdGroupCriterion',
            'adGroupId': ad_group_id,
            'criterion': {
                'xsi_type': 'Gender',
                'id': sexe
            }
        }
    for sexe in SEXES]


  # Create operations.
  operations = []
  for criterion in ad_group_criteria:
    operations.append({
        'operator': 'ADD',
        'operand': criterion
    })
  print(operations)

  response = ad_group_criterion_service.mutate(operations)

  if response and response['value']:
    criteria = response['value']
    for ad_group_criterion in criteria:
      criterion = ad_group_criterion['criterion']
      print ('Ad group criterion with ad group ID %s, criterion ID %s and '
             'type "%s" was added.' %
             (ad_group_criterion['adGroupId'], criterion['id'],
              criterion['type']))
      result.append({
          "id": criterion['genderType'],
          "criterion_id": criterion['id'],
          "citerion_type": criterion['type'],
          "type": ad_group_criterion['AdGroupCriterion.Type']
      })
  else:
    print('No criteria were returned.')
    
  return result


