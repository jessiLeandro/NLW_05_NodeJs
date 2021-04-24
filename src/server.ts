import { http } from './http'
import './websocket/client'

http.listen(3333, () => console.log('server ir running on port 33333'))
