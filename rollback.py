Exists 2 methods:
1.- set a def as atomic:
from django.db import transaction
@transaction.atomic
def viewfunc(request):
  ....
  ....

2.- as block's code:
from django.db import transaction
def viewfunc(request):
  ..
  ...
  
 with transaction.atomic():
  ...
  ....
