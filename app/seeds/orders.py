from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text


def seed_orders():

    orders = [
        {
            "product_id": 1,
            "user_id": 4,
            "quantity": 1
        }
    ]

    for order_data in orders:
        order = Order(**order_data)
        db.session.add(order)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
