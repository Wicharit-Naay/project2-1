services = {
    1: {"name": "HIRONO", "price": 690},
    2: {"name": "CRYBABY", "price": 1590},
    3: {"name": "Labubu Art Gallery", "price": 990},
    4: {"name": "Dimoo Retro", "price": 490},
    5: {"name": "Teletubbies trendy", "price": 650},
    6: {"name": "Molly x Warner Bros", "price": 690},
    7: {"name": "Farmer Bob (ลุงบ๊อบ)", "price": 690},
    8: {"name": "Labubu V1", "price": 990},
    9: {"name": "Labubu V2", "price": 1290},
    10: {"name": "Case Labubu Iphone 16 Pro", "price": 1290},
    11: {"name": "Case Labubu Iphone 16 promax", "price": 1490}
}

def show_service_menu():
    print("\nรายการสินค้าภายในร้าน:")
    for key, service in services.items():
        print(f"{key}. {service['name']} - {service['price']} บาท")

def calculate_total(selected_services, has_membership, is_first_time_member):
    total_price = 0
    for service_id in selected_services:
        total_price += services[service_id]["price"]
    
    if is_first_time_member:
        discount = total_price * 0.20 
        total_price -= discount
        print(f"ส่วนลดสมาชิกใหม่ 20%: {discount:,.2f} บาท")
    elif has_membership:
        discount = total_price * 0.10 

        print(f"ส่วนลดสมาชิก 10%: {discount:,.2f} บาท")
    
    return total_price

while True:
    print("\nยินดีต้อนรับสู่ระบบการร้านขายกล่องสุ่ม Art Toy")
    
    while True:
        show_service_menu()

        selected_services = []
        while True:
            service_id = int(input("กรุณาเลือกหมายเลขบริการ (หรือพิมพ์ 0 เพื่อสิ้นสุดการเลือก): "))
            
            if service_id == 0:
                break
            
            if service_id in services:
                selected_services.append(service_id)
                print(f"คุณได้เลือก: {services[service_id]['name']}")
            else:
                print("หมายเลขบริการไม่ถูกต้อง กรุณาเลือกใหม่")
        
        if selected_services:
            print("\nกล่องสุ่มที่คุณเลือก:")
            for service_id in selected_services:
                print(f"- {services[service_id]['name']} ({services[service_id]['price']} บาท)")
            
            total_items = len(selected_services)
            print(f"\nจำนวนสินค้าที่เลือกทั้งหมด: {total_items} รายการ")

            has_membership = input("คุณมีบัตรสมาชิกหรือไม่? (y/n): ").lower() == 'y'
            is_first_time_member = False 
            

            if not has_membership:
                register_membership = input("คุณต้องการสมัครบัตรสมาชิกหรือไม่? (y/n): ").lower() == 'y'
                if register_membership:
                    name = input("กรุณากรอกชื่อของคุณเพื่อสมัครสมาชิก: ")
                    print(f"ขอบคุณ {name} คุณได้สมัครสมาชิกเรียบร้อยแล้ว!")
                    is_first_time_member = True  

            total_price = calculate_total(selected_services, has_membership, is_first_time_member)
            print(f"ค่าใช้จ่ายรวมทั้งหมด: {total_price:,.2f} บาท")
        else:
            print("คุณไม่ได้เลือกสินค้าใด ๆ")
        
        print("ขอบคุณที่ใช้บริการ")
        print("กรุณาชำระเงิน ธนาคารกรุงไทย เลขที่บัญชี 66010914115")
        restart = input("\nคุณต้องการซื้อสินค้าเพิ่มหรือไม่? (y/n): ").lower()
        if restart == 'y':
            print("\nเริ่มใหม่...")
            break
        else:
            print("ขอบคุณที่ซื้อ!")
            exit()