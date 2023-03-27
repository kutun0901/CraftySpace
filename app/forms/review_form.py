from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired

class ReviewForm():
    rating = IntegerField('Rating', validators=[DataRequired()])
    comment = StringField('Comment', validators=[DataRequired()])
