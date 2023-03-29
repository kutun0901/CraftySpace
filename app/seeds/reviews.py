from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

from faker import Faker

fake = Faker()

def seed_reviews():
    reviews = [
        {
            "user_id": 1,
            "product_id": 2,
            "rating": 5,
            "comment": fake.sentence()
        },
        {
            "user_id": 4,
            "product_id": 1,
            "rating": 3,
            "comment": fake.sentence()
        },
        {
            "user_id": 4,
            "product_id": 2,
            "rating": 4,
            "comment": fake.sentence()
        },
        {
            "user_id": 2,
            "product_id": 3,
            "rating": 3,
            "comment": fake.sentence()
        },
        {
            "user_id": 3,
            "product_id": 1,
            "rating": 3,
            "comment": fake.sentence()
        },
        {
            "user_id": 3,
            "product_id": 5,
            "rating": 3,
            "comment": fake.sentence()
        },
        {
            "user_id": 1,
            "product_id": 6,
            "rating": 5,
            "comment": fake.sentence()
        },
        {
            "user_id": 4,
            "product_id": 7,
            "rating": 4,
            "comment": fake.sentence()
        },
        {
            "user_id": 1,
            "product_id": 8,
            "rating": 5,
            "comment": fake.sentence()
        },
        {
            "user_id": 4,
            "product_id": 9,
            "rating": 4,
            "comment": fake.sentence()
        },
        {
            "user_id": 3,
            "product_id": 11,
            "rating": 3,
            "comment": fake.sentence()
        },
    ]

    for review_data in reviews:
        review = Review(**review_data)
        db.session.add(review)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
