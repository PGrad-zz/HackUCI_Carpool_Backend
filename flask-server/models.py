from app import db

class User(db.model):
    __table__ = Base.metadata.table['users']
