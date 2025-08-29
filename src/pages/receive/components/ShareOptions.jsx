import React from 'react';
import Button from '../../../components/ui/Button';


const ShareOptions = ({ address, amount, asset }) => {
  const shareText = `Send ${amount ? `${amount} ` : ''}${asset} to this address: ${address}`;

  const handleShare = async (method) => {
    if (navigator.share && method === 'native') {
      try {
        await navigator.share({
          title: `Receive ${asset}`,
          text: shareText,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for specific methods
      switch (method) {
        case 'sms':
          window.open(`sms:?body=${encodeURIComponent(shareText)}`);
          break;
        case 'email':
          window.open(`mailto:?subject=Receive ${asset}&body=${encodeURIComponent(shareText)}`);
          break;
        case 'copy':
          navigator.clipboard?.writeText(shareText);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Share Address</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => handleShare('native')}
          iconName="Share"
          iconPosition="left"
          className="justify-center"
        >
          Share
        </Button>
        <Button
          variant="outline"
          onClick={() => handleShare('sms')}
          iconName="MessageSquare"
          iconPosition="left"
          className="justify-center"
        >
          SMS
        </Button>
        <Button
          variant="outline"
          onClick={() => handleShare('email')}
          iconName="Mail"
          iconPosition="left"
          className="justify-center"
        >
          Email
        </Button>
        <Button
          variant="outline"
          onClick={() => handleShare('copy')}
          iconName="Copy"
          iconPosition="left"
          className="justify-center"
        >
          Copy Text
        </Button>
      </div>
    </div>
  );
};

export default ShareOptions;