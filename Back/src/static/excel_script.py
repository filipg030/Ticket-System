import os
import pandas as pd
import sys

def save_data():
            
            df = None
            current_path = os.getcwd()
            data_path = os.path.join(current_path,"db","tickets.db")

            try:
                df = pd.read_json(data_path,lines=True)
                if df.empty:
                      print("Dataframe is empty, nothing to make data from")
                      return
            except Exception as e:
                print(f"Error while reading the database data: {e}", file=sys.stderr)
                return -1
            
            try:
                df.to_excel('output.xlsx',index=False)
            except Exception as e:
                print(f"Error while writing data to excel: {e}", file=sys.stderr)                
                return -1
save_data()