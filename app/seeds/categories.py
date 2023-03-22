from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text



def seed_categories():
    clothing = Category( name="Clothing and Shoes")
    home = Category( name="Home")
    arts = Category( name="Arts")
    toys = Category( name="Toys")
    jewelry = Category( name="Jewelry")


    db.session.add(clothing)
    db.session.add(home)
    db.session.add(arts)
    db.session.add(toys)
    db.session.add(jewelry)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
