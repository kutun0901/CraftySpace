from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_images():

    product_images = [
        {
            "product_id": 1,
            "image_url": "https://i.imgur.com/G1IvGdr.jpeg"
        },
        {
            "product_id": 1,
            "image_url": "https://i.imgur.com/g29u26Y.jpeg"
        },
        {
            "product_id": 1,
            "image_url": "https://i.imgur.com/yZUUH3q.jpeg"
        },
        {
            "product_id": 2,
            "image_url": "https://i.etsystatic.com/22012661/r/il/ea8302/3624327648/il_fullxfull.3624327648_8igx.jpg"
        },
        {
            "product_id": 2,
            "image_url": "https://i.pinimg.com/originals/a1/bb/8e/a1bb8e943d04d33e1a0b4737c1ba285c.jpg"
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
            "image_url": "https://i0.wp.com/socalfunfamily.com/wp-content/uploads/2019/12/universal-studios-frog-choir-1.jpg"
        },
         {
            "product_id": 4,
            "image_url": "https://i.pinimg.com/originals/e9/97/ff/e997ff997ac84cc76aca62baa9fb62a0.jpg"
        },
        {
            "product_id": 5,
            "image_url": "http://4.bp.blogspot.com/-sDcc993Q0ag/TiTacLFNR4I/AAAAAAAAEqw/WzCs0NyAVzQ/s1600/Diagon_Alley_-_Eeylops_Owl_Emporium.jpg"
        },
        {
            "product_id": 6,
            "image_url": "https://i.etsystatic.com/34606524/r/il/926a07/4362513931/il_fullxfull.4362513931_bo7z.jpg"
        },
        {
            "product_id": 6,
            "image_url": "https://ravenfoxcapes.com/wp-content/uploads/2018/06/Robes2.jpg"
        },
        {
            "product_id": 7,
            "image_url": "https://i.etsystatic.com/17647244/r/il/fb96ec/4728728254/il_794xN.4728728254_3xt8.jpg"
        },
        {
            "product_id": 7,
            "image_url": "https://i.etsystatic.com/17647244/r/il/130f63/4728728244/il_794xN.4728728244_jjqw.jpg"
        },
          {
            "product_id": 8,
            "image_url": "https://media.wdwnt.com/2022/12/Wizarding-World-Harry-Potter-Wands-Universal-Studios-Hollywood-2022-00012-1000x750.jpg"
        },
        {
            "product_id": 8,
            "image_url": "https://media.wdwnt.com/2022/12/Wizarding-World-Harry-Potter-Wands-Universal-Studios-Hollywood-2022-00011-1000x750.jpg"
        },
        {
            "product_id": 9,
            "image_url": "https://assets.pinshape.com/uploads/image/file/296865/container_harry-potter-draco-malfoy-s-nimbus-2001-full-size-30-off-3d-printing-296865.png"
        },
        {
            "product_id": 9,
            "image_url": "https://files.cults3d.com/uploaders/14585245/illustration-file/6795c64e-54aa-4e8d-9795-912359568104/Nimbus%202001%20Standing%20Environment%20Light.png"
        },
        {
            "product_id": 9,
            "image_url": "https://files.cults3d.com/uploaders/14585245/illustration-file/f64b922a-6387-4bef-97da-722fe06f1f27/Printed%200d.jpg"
        },
        {
            "product_id": 10,
            "image_url": "https://i.ebayimg.com/images/g/kYAAAOSwVL1WCRKt/s-l650.jpg"
        },
        {
            "product_id": 11,
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/The_Making_of_Harry_Potter_29-05-2012_%28Mandrake%29.jpg/1200px-The_Making_of_Harry_Potter_29-05-2012_%28Mandrake%29.jpg"
        },
        {
            "product_id": 11,
            "image_url": "https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202302/0156/harry-potter-lit-mandrake-root-l.jpg"
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
