import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SupportSection = ({ isExpanded, onToggle }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const supportItems = [
    {
      icon: 'HelpCircle',
      title: 'Help Center',
      description: 'Browse frequently asked questions',
      action: 'Browse'
    },
    {
      icon: 'MessageCircle',
      title: 'Contact Support',
      description: 'Get help from our support team',
      action: 'Contact'
    },
    {
      icon: 'BookOpen',
      title: 'User Guide',
      description: 'Learn how to use VaultPay',
      action: 'Read'
    },
    {
      icon: 'Bug',
      title: 'Report Bug',
      description: 'Report issues or bugs',
      action: 'Report'
    }
  ];

  const handleContactSubmit = () => {
    // Mock contact form submission
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    setShowContactModal(false);
    setContactForm({ subject: '', message: '', priority: 'medium' });
  };

  return (
    <div className="glass-card rounded-xl border border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors rounded-xl"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Icon name="LifeBuoy" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Support</h3>
            <p className="text-sm text-muted-foreground">Get help and support</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-4 border-t border-white/10">
          {supportItems?.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Icon name={item?.icon} size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{item?.title}</p>
                  <p className="text-xs text-muted-foreground">{item?.description}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (item?.title === 'Contact Support') {
                    setShowContactModal(true);
                  }
                }}
              >
                {item?.action}
              </Button>
            </div>
          ))}

          {/* App Version */}
          <div className="flex items-center justify-between py-3 border-t border-white/10 mt-6">
            <div className="flex items-center space-x-3">
              <Icon name="Info" size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">App Version</p>
                <p className="text-xs text-muted-foreground">VaultPay v2.1.0</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Latest</p>
          </div>
        </div>
      )}
      {/* Contact Support Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 glass" onClick={() => setShowContactModal(false)} />
          <div className="relative w-full max-w-md glass-card rounded-2xl shadow-glass-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Contact Support</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowContactModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Subject"
                  type="text"
                  placeholder="Brief description of your issue"
                  value={contactForm?.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e?.target?.value })}
                />

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
                  <div className="flex space-x-2">
                    {['low', 'medium', 'high']?.map((priority) => (
                      <button
                        key={priority}
                        onClick={() => setContactForm({ ...contactForm, priority })}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          contactForm?.priority === priority
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-white/5 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {priority?.charAt(0)?.toUpperCase() + priority?.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                  <textarea
                    placeholder="Describe your issue in detail..."
                    value={contactForm?.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e?.target?.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowContactModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleContactSubmit}
                    disabled={!contactForm?.subject || !contactForm?.message}
                    className="flex-1"
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportSection;