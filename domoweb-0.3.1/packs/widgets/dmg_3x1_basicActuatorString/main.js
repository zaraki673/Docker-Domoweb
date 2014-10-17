(function($) {
    $.create_widget({
        // default options
        options: {
            version: 0.1,
            creator: 'Domogik',
            id: 'dmg_3x1_basicActuatorString',
            name: 'Basic string widget',
            description: 'Send string value',
            type: 'actuator.string',
            height: 1,
            width: 3,
            displayname: true,
            displayborder: true
        },

        _init: function() {
            var self = this, o = this.options;
            this.element.addClass("icon32-usage-" + o.usage)
              .processing();
            this.input = $("<input type='text' />")
                .keypress(function (e) {if (e.which == 13 || e.which == 32) {self.action(); e.stopPropagation();}});
            this.element.append(this.input);
            var send = $('<div class="command">Send</div>').attr("tabindex", 0);
            send.click(function (e) {self.action();e.stopPropagation();})
                .keypress(function (e) {if (e.which == 13 || e.which == 32) {self.action(); e.stopPropagation();}});
            this.element.append(send);
        },
        
        _statsHandler: function(stats) {
        },
        
        _eventHandler: function(timestamp, value) {
        },
        
        action: function() {
            var self = this, o = this.options;
            if (this.input.val()) {
                this.element.startProcessingState();
                var params = {};
                if (o.model_parameters.command) {
                    params["command"] = o.model_parameters.command;
                    params["value"] = this.input.val();                    
                } else {
                    params["command"] = this.input.val();                    
                }
                rinor.put(['api', 'command', o.devicetechnology, o.deviceaddress], params)
                    .done(function(data, status, xhr){
                        self.valid(o.featureconfirmation);
                    })
                    .fail(function(jqXHR, status, error){
                        self.cancel();
                        if (jqXHR.status == 400)
                            $.notification('error', jqXHR.responseText);
                    });
            }
        },

        cancel: function() {
            this.element.stopProcessingState();
        },

        /* Valid the processing state */
        valid: function(confirmed) {
            this.element.stopProcessingState();
        }
    });
})(jQuery);
