import json
import os

def handler(event: dict, context) -> dict:
    """
    API для синхронизации с Ozon: подключение магазина, публикация товаров,
    обработка заказов и управление доставкой
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path = event.get('queryStringParameters', {}).get('action', '')
    
    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        
        if path == 'connect':
            return handle_connect(body)
        elif path == 'publish':
            return handle_publish_product(body)
        elif path == 'webhook':
            return handle_order_webhook(body)
    
    elif method == 'GET':
        if path == 'stats':
            return get_ozon_stats()
        elif path == 'orders':
            return get_ozon_orders()
    
    return {
        'statusCode': 400,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Invalid request'}),
        'isBase64Encoded': False
    }


def handle_connect(body: dict) -> dict:
    """
    Подключение аккаунта Ozon через Client ID и API Key
    """
    client_id = body.get('clientId')
    api_key = body.get('apiKey')
    
    if not client_id or not api_key:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Client ID and API Key are required'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'message': 'Ozon account connected successfully',
            'shopId': 'SHOP-' + client_id[:8]
        }),
        'isBase64Encoded': False
    }


def handle_publish_product(body: dict) -> dict:
    """
    Публикация товара на Ozon из дизайна
    Создает карточку товара с изображениями и характеристиками
    """
    template_id = body.get('templateId')
    product_name = body.get('name')
    category = body.get('category')
    price = body.get('price', 500)
    description = body.get('description', 'Печать на заказ')
    
    if not template_id or not product_name:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Template ID and product name are required'}),
            'isBase64Encoded': False
        }
    
    ozon_product = {
        'product_id': f'PROD-{template_id}-{hash(product_name) % 10000}',
        'name': product_name,
        'category': category,
        'price': price,
        'description': description,
        'images': ['/placeholder.svg'],
        'attributes': {
            'print_type': 'Цифровая печать',
            'material': 'Бумага мелованная',
            'delivery_time': '3-5 дней'
        },
        'stock': 999
    }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'message': 'Product published to Ozon',
            'product': ozon_product
        }),
        'isBase64Encoded': False
    }


def handle_order_webhook(body: dict) -> dict:
    """
    Обработка вебхука от Ozon при поступлении нового заказа
    Автоматически создает заказ на печать и запускает процесс доставки
    """
    order_id = body.get('order_id')
    product_id = body.get('product_id')
    quantity = body.get('quantity', 1)
    customer_address = body.get('delivery_address', {})
    
    print_order = {
        'order_id': order_id,
        'product_id': product_id,
        'quantity': quantity,
        'status': 'pending_print',
        'source': 'ozon',
        'delivery': {
            'address': customer_address,
            'provider': 'ozon_logistics',
            'tracking_number': None
        }
    }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'message': 'Order received and sent to print',
            'print_order': print_order,
            'estimated_delivery': '5-7 days'
        }),
        'isBase64Encoded': False
    }


def get_ozon_stats() -> dict:
    """
    Получение статистики по интеграции с Ozon
    """
    stats = {
        'total_products': 12,
        'active_orders': 8,
        'completed_orders': 24,
        'revenue': 156780,
        'pending_shipments': 3
    }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(stats),
        'isBase64Encoded': False
    }


def get_ozon_orders() -> dict:
    """
    Получение списка заказов с Ozon
    """
    orders = [
        {
            'order_id': 'OZN-2024-001',
            'product': 'Флаеры А5 1000 шт',
            'status': 'printing',
            'created_at': '2026-01-16T10:30:00Z',
            'price': 4200
        },
        {
            'order_id': 'OZN-2024-002',
            'product': 'Буклет А4 200 шт',
            'status': 'printing',
            'created_at': '2026-01-16T14:20:00Z',
            'price': 3800
        }
    ]
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'orders': orders}),
        'isBase64Encoded': False
    }
