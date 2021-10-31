function setup() {
    Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
        onEnter: function(args) {
            if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
                cache.fd = args[0].toInt32();
                if (cache.options.redirectHost) {
                    var host = Memory.allocUtf8String(cache.options.redirectHost);
                    var port = parseInt(cache.options.redirectPort);
                    Memory.writeInt(args[1].add(4), inet_addr(host));
                    Memory.writeU16(args[1].add(2), ntohs(port));
                }
                setupMessaging();
                hacksupermod()
            }
        }
    });
}
//I used this code in xeon's v29 script
