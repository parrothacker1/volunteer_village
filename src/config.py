import string
import random

config={
        "access_token":"".join(random.choices(string.ascii_letters+string.digits,k=128)),
        "refresh_token":"".join(random.choices(string.ascii_letters+string.digits,k=32))
}
