from .db import db, add_prefix_for_prod, SCHEMA, environment

class Category(db.Model):
    __tablename__ = "categories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    products = db.relationship("Product", back_populates="category")


    def to_dict(self):
        return {
            "name": self.name
        }
