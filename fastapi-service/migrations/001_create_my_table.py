steps = [
    [
        ## Create the table
        """
        db.createCollection( "Comments" ,
        {"$jsonSchema":{"bsonType":"object","additionalProperties":false,"required":["_id","content"],
            "properties": {
            "_id":{"bsonType":"string","description":"PK id becomes _id "},
            "content":{"bsonType":"string"}}},
            "$expr": [
            ]}
        )
        """,
        ## Drop the table
        # """
        # DROP TABLE vacations;
        # """
    ]
]
