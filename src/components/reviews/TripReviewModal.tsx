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
import { Star, Bus, Sparkles } from 'lucide-react';
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
      toast.success('Thank you for rating your trip! Your feedback helps other travelers.');
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6 rounded-2xl">
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
      </DialogContent>
    </Dialog>
  );
}
