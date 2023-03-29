from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text



def seed_categories():
    wands = Category( name="Wands")
    textbooks = Category( name="Spell TextBooks")
    creatures = Category( name="Magical Creatures")
    fashion = Category( name="Fashion")
    equipments = Category( name="Equipments")


    db.session.add(wands)
    db.session.add(textbooks)
    db.session.add(creatures)
    db.session.add(fashion)
    db.session.add(equipments)

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
