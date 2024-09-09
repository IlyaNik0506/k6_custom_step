# load_shape.py
from locust import LoadTestShape

class StagesShapeWithCustomUsers(LoadTestShape):
    stages = [
        {"duration": 10, "users": 10, "spawn_rate": 10, "user_classes": [Pan]},
        {"duration": 30, "users": 50, "spawn_rate": 10, "user_classes": [Pan, Dpan]},
        {"duration": 60, "users": 100, "spawn_rate": 10, "user_classes": [Dpan]},
        {"duration": 120, "users": 100, "spawn_rate": 10, "user_classes": [Pan,Dpan]},
    ]

    def tick(self):
        run_time = self.get_run_time()

        for stage in self.stages:
            if run_time < stage["duration"]:
                try:
                    tick_data = (stage["users"], stage["spawn_rate"], stage["user_classes"])
                except:
                    tick_data = (stage["users"], stage["spawn_rate"])
                return tick_data

        return None


#load_shape.py
from locust import LoadTestShape

class StagesShapeWithCustomUsers(LoadTestShape):
    stages = [
        {"duration": 10, "users": 10, "spawn_rate": 10, "user_classes": [Pan]},
        {"duration": 30, "users": 50, "spawn_rate": 10, "user_classes": [Pan, Dpan]},
        {"duration": 60, "users": 100, "spawn_rate": 10, "user_classes": [Dpan]},
        {"duration": 120, "users": 100, "spawn_rate": 10, "user_classes": [Pan,Dpan]},
    ]

    def tick(self):
        run_time = self.get_run_time()

        for stage in self.stages:
            if run_time < stage["duration"]:
                try:
                    tick_data = (stage["users"], stage["spawn_rate"], stage["user_classes"])
                except:
                    tick_data = (stage["users"], stage["spawn_rate"])
                return tick_data

        return None**
