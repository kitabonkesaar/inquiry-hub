import React, { useState } from 'react';
import { marketplaceStore } from '@/services/marketplaceStore';
import { OwnerKYC } from '@/types/marketplace';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ShieldCheck, FileCheck, Building2, UploadCloud, CheckCircle2 } from 'lucide-react';

interface OwnerKYCModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerId?: string;
}

export function OwnerKYCModal({ isOpen, onClose, ownerId = 'owner-1' }: OwnerKYCModalProps) {
  const currentKYC = marketplaceStore.getOwnerKYC(ownerId);

  const [businessName, setBusinessName] = useState(currentKYC?.businessName || 'Kalinga Express Lines Pvt Ltd');
  const [contactPerson, setContactPerson] = useState(currentKYC?.contactPerson || 'Sanjay Kumar Jena');
  const [phone, setPhone] = useState(currentKYC?.phone || '+91 94370 12345');
  const [email, setEmail] = useState(currentKYC?.email || 'kalinga.express@rentanybus.in');
  const [gstNumber, setGstNumber] = useState(currentKYC?.gstNumber || '21AAACK1928N1Z5');
  const [rcBookNumber, setRcBookNumber] = useState(currentKYC?.rcBookNumber || 'OD02CB9090-RC-2024');
  const [bankAccountName, setBankAccountName] = useState(currentKYC?.bankAccountName || 'Kalinga Express Lines Pvt Ltd');
  const [bankAccountNumber, setBankAccountNumber] = useState(currentKYC?.bankAccountNumber || '912020045612348');
  const [bankIfsc, setBankIfsc] = useState(currentKYC?.bankIfsc || 'HDFC0000543');
  const [bankName, setBankName] = useState(currentKYC?.bankName || 'HDFC Bank, Saheed Nagar');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !gstNumber || !bankAccountNumber || !bankIfsc) {
      toast.error('Please fill in all mandatory KYC & settlement fields.');
      return;
    }

    marketplaceStore.saveOwnerKYC({
      ownerId,
      businessName,
      contactPerson,
      phone,
      email,
      gstNumber,
      rcBookNumber,
      bankAccountName,
      bankAccountNumber,
      bankIfsc,
      bankName,
      kycStatus: 'verified', // Set to verified in simulation or pending
      submittedAt: new Date().toISOString(),
    });

    toast.success('KYC documents submitted & verified successfully!');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl">
        <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">Fleet Operator KYC & Bank Details</DialogTitle>
                <DialogDescription className="text-xs">
                  Government compliance, GST registration, RC book, and payout settlement details.
                </DialogDescription>
              </div>
            </div>

            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-300">
              {currentKYC?.kycStatus === 'verified' ? 'Verified Partner' : 'Verification Required'}
            </Badge>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Business & GST Details */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px] text-muted-foreground">
              Business Registration
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="b_name">Registered Legal Business / Travel Entity Name</Label>
                <Input
                  id="b_name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="gst">GSTIN (Goods & Services Tax ID)</Label>
                <Input
                  id="gst"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="contact">Director / Contact Person</Label>
                <Input
                  id="contact"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Official Mobile (OTP & Alerts)</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Settlement Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* RC Document Verification */}
          <div className="space-y-3 pt-2 border-t">
            <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px] text-muted-foreground">
              Fleet Commercial Permit & RC
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="rc_num">Primary Commercial RC Certificate Number</Label>
                <Input
                  id="rc_num"
                  value={rcBookNumber}
                  onChange={(e) => setRcBookNumber(e.target.value.toUpperCase())}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>RC Book & Tourist Permit Upload</Label>
                <div className="border border-dashed rounded-lg p-2.5 text-center bg-muted/20 hover:bg-muted/40 cursor-pointer flex items-center justify-center gap-2">
                  <UploadCloud className="w-4 h-4 text-primary" />
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Attached: RC_Permit_Document.pdf (Verified)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Settlement Account */}
          <div className="space-y-3 pt-2 border-t">
            <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px] text-muted-foreground">
              Bank Account for Automated Charter Payouts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="acc_name">Bank Account Holder Name</Label>
                <Input
                  id="acc_name"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="acc_no">Bank Account Number</Label>
                <Input
                  id="acc_no"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="ifsc">IFSC Code</Label>
                <Input
                  id="ifsc"
                  value={bankIfsc}
                  onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="bank">Bank Name & Branch</Label>
                <Input
                  id="bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-11 rounded-xl">
              Close
            </Button>
            <Button type="submit" className="flex-1 h-11 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white">
              Save & Verify KYC
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
