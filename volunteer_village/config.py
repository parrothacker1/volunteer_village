import string
import random

config={
        "access_token":"".join(random.choices(string.ascii_letters+string.digits,k=256)),
        "refresh_token":"".join(random.choices(string.ascii_letters+string.digits,k=64)),
        "postgres_url":"postgresql://your_postgres_user:your_postgres_password@db/your_database_name"
}
