from django.urls import path

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from .middleware import TokenAuthMiddlewareStack

from trips.consumers import TaxiConsumer

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    # new
    'websocket': TokenAuthMiddlewareStack(
        URLRouter([
            path('taxi/', TaxiConsumer.as_asgi()),
        ])
    )
    
})
