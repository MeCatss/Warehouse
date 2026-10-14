from database import get_database

def check_database():
    try:
        # Fetch the database connection instance
        db = get_database()
        products_collection = db["products"]
        
        print("🔄 Connecting to MongoDB...")
        
        # 1. Test client connection
        client = products_collection.database.client
        db_names = client.list_database_names()
        print(f"✅ Successfully connected! Available databases: {db_names}")
        
        # 2. Check total document volume
        total_docs = products_collection.count_documents({})
        print(f"📦 Total documents in 'products' collection: {total_docs}")
        
        # 3. Pull a sample record if available
        if total_docs > 0:
            print("\n🔍 Sample Product Document:")
            sample = products_collection.find_one()
            print(sample)
        else:
            print("\n⚠️ The 'products' collection is currently empty.")
            
    except Exception as e:
        print(f"❌ Failed to query database: {e}")

if __name__ == "__main__":
    check_database()
