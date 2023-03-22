from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_images():

    product_images = [
        {
            "product_id": 1,
            "image_url": "https://i.imgur.com/SS8enj8.jpeg"
        },
        {
            "product_id": 1,
            "image_url": "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdjExNTctMDcwXzEtbDEzZXNzZ2IuanBn.jpg"
        },
          {
            "product_id": 2,
            "image_url": "https://i.imgur.com/xKp2PPG.jpeg"
        },
        {
            "product_id": 2,
            "image_url": "https://i.imgur.com/fkPUYGF.jpeg"
        },
          {
            "product_id": 3,
            "image_url": "https://i.imgur.com/L8Kdhxn.png"
        },
        {
            "product_id": 3,
            "image_url": "https://i.imgur.com/GgLGXE9.jpeg"
        },
        {
            "product_id": 4,
            "image_url": "https://i.imgur.com/i520Dvn.jpeg"
        },
        {
            "product_id": 5,
            "image_url": "https://i.etsystatic.com/14825339/r/il/3a2977/1720680873/il_794xN.1720680873_1zz5.jpg"
        },
        {
            "product_id": 6,
            "image_url": "https://i.imgur.com/JEwPwBy.jpeg"
        }

    ]

    for image_data in product_images:
        image = ProductImage(**image_data)
        db.session.add(image)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
