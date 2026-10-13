import React, { useState } from 'react';
import { marketplaceStore } from '@/services/marketplaceStore';
import { Booking } from '@/types/marketplace';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Bus, Sparkles, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TripReviewModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
}

export function TripReviewModal({ booking, isOpen, onClose }: TripReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please write a short review sharing your trip experience.');
      return;
    }

    setIsSubmitting(true);
    try {
      marketplaceStore.addReview({
        bookingId: booking.id,
        busId: booking.busId,
        customerName: booking.customerName,
        rating,
        comment: comment.trim(),
      });
      if (rating >= 4) {
        setSubmitted(true);
      } else {
        toast.success('Thank you for your feedback! Our quality management team will review this trip.');
        onClose();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyAndOpenGoogle = () => {
    navigator.clipboard.writeText(comment);
    setCopied(true);
    toast.success('Review copied to clipboard! Opening Google...');
    setTimeout(() => {
      window.open('https://search.google.com/local/writereview?placeid=ChIJc6bZ_rentanybus_placeholder', '_blank');
    }, 600);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => { setSubmitted(false); onClose(); }}>
      <DialogContent className="sm:max-w-md p-6 rounded-2xl">
        {submitted ? (
          <div className="space-y-5 text-center py-2 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold mb-1.5">Review Submitted!</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Your verified feedback has been posted for <strong>{booking.busName}</strong>.
              </DialogDescription>
            </div>

            <div className="p-4 rounded-xl bg-muted/60 border border-border text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Share this on Google to help fellow Odisha travelers?</span>
              </div>
              <p className="text-xs text-muted-foreground">
                We've prepared your review text so you can paste it directly onto our Google Business Profile in 10 seconds.
              </p>
              <div className="text-xs italic bg-background p-2.5 rounded-lg border border-border/80 text-foreground">
                "{comment}"
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <Button 
                onClick={handleCopyAndOpenGoogle}
                className="w-full h-11 rounded-xl text-xs font-bold gap-2 bg-primary hover:bg-primary/90"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied! Opening Google...' : 'Copy Review & Post on Google'}
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => { setSubmitted(false); onClose(); }}
                className="text-xs text-muted-foreground"
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-1 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-1">
                <Sparkles className="w-6 h-6" />
              </div>
              <DialogTitle className="text-xl font-bold">Rate Your Trip Experience</DialogTitle>
              <DialogDescription className="text-xs">
                How was your charter journey with <strong>{booking.busName}</strong>?
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              {/* Star Rating Select */}
              <div className="flex justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={cn(
                        "w-8 h-8 transition-colors",
                        (hoverRating || rating) >= star
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      )}
                    />
                  </button>
                ))}
              </div>

              <div className="text-center text-xs font-semibold text-amber-600 dark:text-amber-400">
                {rating === 5 && 'Outstanding - Highly Recommended!'}
                {rating === 4 && 'Very Good - Comfortable ride'}
                {rating === 3 && 'Average - Met basic expectations'}
                {rating === 2 && 'Below Average - Room for improvement'}
                {rating === 1 && 'Unsatisfactory'}
              </div>

              {/* Comment Box */}
              <div className="space-y-1.5">
                <Textarea
                  placeholder="Tell us about the vehicle cleanliness, AC performance, captain punctuality, and route experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="text-xs min-h-[100px] rounded-xl"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 rounded-xl h-10 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl h-10 text-xs font-semibold"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
