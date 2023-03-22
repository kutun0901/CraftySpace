from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FloatField, IntegerField, FieldList
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    image_urls = FieldList(StringField("Image URL", validators=[DataRequired()]))
    name = StringField("Name", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    quantity = IntegerField("Quantity", validators=[DataRequired()])
    category_id = IntegerField("Category", validators=[DataRequired()])
    price = FloatField("Price", validators=[DataRequired()])
