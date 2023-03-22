from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()


def seed_products():

    products = [
        {
            "name": "Shirt",
            "description": fake.sentence(),
            "price": 44.00,
            "quantity": 10,
            "category_id": 1,
            "user_id": 1
        },
        {
            "name": "Rocking chair",
            "description": fake.sentence(),
            "price": 140.00,
            "quantity": 5,
            "category_id": 2,
             "user_id": 2
        },
        {
            "name": "Corgi painting",
            "description": fake.sentence(),
            "price": 499.99,
            "quantity": 3,
            "category_id": 3,
            "user_id": 3
        },
        {
            "name": "Harry Potter lego set",
            "description": fake.sentence(),
            "price": 149.99,
            "quantity": 23,
            "category_id": 4,
            "user_id": 1
        },
        {
            "name": "Witch Bloom",
            "description": fake.sentence(),
            "price": 29.99,
            "quantity": 10,
            "category_id": 4,
            "user_id": 2
        },
        {
            "name": "Crystal necklace",
            "description": fake.sentence(),
            "price": 79.99,
            "quantity": 12,
            "category_id": 5,
            "user_id": 3
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
