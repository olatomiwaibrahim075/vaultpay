import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = ({ isExpanded, onToggle }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });
  const [editData, setEditData] = useState(profileData);

  const avatarOptions = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  ];

  const handleSaveProfile = () => {
    setProfileData(editData);
    setShowEditModal(false);
  };

  return (
    <div className="glass-card rounded-xl border border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors rounded-xl"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Icon name="User" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Profile</h3>
            <p className="text-sm text-muted-foreground">Manage your account information</p>
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
          {/* Profile Info */}
          <div className="flex items-center space-x-4 py-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={profileData?.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{profileData?.displayName}</p>
              <p className="text-xs text-muted-foreground">{profileData?.email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </Button>
          </div>

          {/* Email Verification */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Email Verification</p>
                <p className="text-xs text-success">Verified</p>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-success"></div>
          </div>

          {/* Account Type */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Icon name="Crown" size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Account Type</p>
                <p className="text-xs text-muted-foreground">Premium Member</p>
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </div>
        </div>
      )}
      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 glass" onClick={() => setShowEditModal(false)} />
          <div className="relative w-full max-w-md glass-card rounded-2xl shadow-glass-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Edit Profile</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowEditModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Avatar Selection */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Profile Picture</label>
                  <div className="grid grid-cols-4 gap-3">
                    {avatarOptions?.map((avatar, index) => (
                      <button
                        key={index}
                        onClick={() => setEditData({ ...editData, avatar })}
                        className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-colors ${
                          editData?.avatar === avatar ? 'border-primary' : 'border-white/20'
                        }`}
                      >
                        <img
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Name */}
                <Input
                  label="Display Name"
                  type="text"
                  value={editData?.displayName}
                  onChange={(e) => setEditData({ ...editData, displayName: e?.target?.value })}
                  placeholder="Enter your display name"
                />

                {/* Email */}
                <Input
                  label="Email Address"
                  type="email"
                  value={editData?.email}
                  onChange={(e) => setEditData({ ...editData, email: e?.target?.value })}
                  placeholder="Enter your email"
                />

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    className="flex-1"
                  >
                    Save Changes
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

export default ProfileSection;