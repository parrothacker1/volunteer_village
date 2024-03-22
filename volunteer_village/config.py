import string
import random

config={
        "access_token":"".join(random.choices(string.ascii_letters+string.digits,k=256)),
        "refresh_token":"".join(random.choices(string.ascii_letters+string.digits,k=64)),
        "postgres_url":"postgres://volunteer_village:volunteer_village123@postgres_db:5432/village"
}
