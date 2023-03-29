from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()


def seed_products():

    products = [
        {
            "name": "Vine Wood Wand",
            "description": fake.sentence(),
            "price": 350.00,
            "quantity": 10,
            "category_id": 1,
            "user_id": 1
        },
        {
            "name": "The Standard Book of Spells",
            "description": fake.sentence(),
            "price": 140.00,
            "quantity": 5,
            "category_id": 2,
            "user_id": 2
        },
        {
            "name": "Corgi Witch Painting",
            "description": fake.sentence(),
            "price": 499.99,
            "quantity": 3,
            "category_id": 5,
            "user_id": 3
        },
        {
            "name": "Pet Toad",
            "description": fake.sentence(),
            "price": 249.99,
            "quantity": 23,
            "category_id": 3,
            "user_id": 1
        },
        {
            "name": "Tawny Owl",
            "description": fake.sentence(),
            "price": 2999.99,
            "quantity": 10,
            "category_id": 3,
            "user_id": 2
        },
        {
            "name": "Hogwarts School Robes",
            "description": fake.sentence(),
            "price": 179.99,
            "quantity": 12,
            "category_id": 4,
            "user_id": 3
        },
        {
            "name": "Dark Wizard Hat",
            "description": fake.sentence(),
            "price": 129.99,
            "quantity": 15,
            "category_id": 4,
            "user_id": 2
        },
        {
            "name": "Aspen and Unicorn Hair Wand",
            "description": fake.sentence(),
            "price": 638.99,
            "quantity": 14,
            "category_id": 1,
            "user_id": 3
        },
        {
            "name": "Nimbus 2001",
            "description": fake.sentence(),
            "price": 999.99,
            "quantity": 14,
            "category_id": 5,
            "user_id": 3
        },
        {
            "name": "Quaffle Ball",
            "description": fake.sentence(),
            "price": 199.49,
            "quantity": 10,
            "category_id": 5,
            "user_id": 1
        },
        {
            "name": "Mandrake Root",
            "description": fake.sentence(),
            "price": 19.99,
            "quantity": 10,
            "category_id": 3,
            "user_id": 4
        }
    ]

    for product_data in products:
        product = Product(**product_data)
        db.session.add(product)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
