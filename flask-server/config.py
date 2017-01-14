import os
basedir = os.path.abspath(os.path.dirname(__file__))
with open('db_cfg.txt', 'r') as db_cfg:
    db_uri = db_cfg.read()
SQLALCHEMY_DATABASE_URI = (db_uri)
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
