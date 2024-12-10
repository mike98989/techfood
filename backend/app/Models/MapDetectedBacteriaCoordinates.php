<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MapDetectedBacteriaCoordinates extends Model
{
    use HasFactory;
    protected $table="map_detected_bacteria_coordinates";

    public function image(): HasOne{
        return $this->hasOne(MapDetectedBacteriaImagePath::class, 'id','image_path_id');
    }
    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id','id');
    }
}
