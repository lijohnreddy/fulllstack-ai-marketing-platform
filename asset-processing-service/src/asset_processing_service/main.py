from time import sleep


def main():
    while True:
        try:
            print("Hello to your new beginning!", flush=True)
        except Exception as e:
            print(f"Error: {e}", flush=True)
        sleep(5)


if __name__ == "__main__":
    main()
